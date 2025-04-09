from flask import Flask, request, jsonify
from PIL import Image
import numpy as np
import requests
from io import BytesIO
import os
import json
import re  # Regex to extract JSON from GPT response
from openai import OpenAI
from dotenv import load_dotenv
from flask_cors import CORS  # Import CORS for frontend API requests

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

# Initialize OpenAI Client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


# Function to analyze the image
def analyze_image(image_url):
    try:
        response = requests.get(image_url, timeout=10)
        if response.status_code != 200:
            return None, None, "Failed to retrieve image from URL."

        # Open image from response content
        image = Image.open(BytesIO(response.content)).convert("RGB")
        image_np = np.array(image)

        # Define color ranges for classification
        cleared_land_min = np.array([40, 30, 40])
        cleared_land_max = np.array([120, 100, 110])

        tree_land_min = np.array([10, 30, 30])
        tree_land_max = np.array([80, 110, 130])

        # Create masks for classification
        cleared_mask = np.all(
            (cleared_land_min <= image_np) & (image_np <= cleared_land_max), axis=-1
        )
        tree_mask = np.all(
            (tree_land_min <= image_np) & (image_np <= tree_land_max), axis=-1
        )

        # Count pixels for each category
        total_pixels = cleared_mask.size
        cleared_land_count = np.sum(cleared_mask)
        tree_land_count = np.sum(tree_mask)

        # Ensure total land calculation is valid
        total_land_count = cleared_land_count + tree_land_count
        if total_land_count == 0:
            return 0.0, 0.0, "No land detected in the image."

        # Calculate percentage
        cleared_percentage = (cleared_land_count / total_land_count) * 100
        tree_percentage = (tree_land_count / total_land_count) * 100

        return round(cleared_percentage, 2), round(tree_percentage, 2), None

    except Exception as e:
        return None, None, str(e)


# Function to generate work plan using GPT
def generate_work_plan(tree_land_area, number_of_days):
    try:
        prompt = f"""
        You are an expert in land clearing. A given land area of {tree_land_area} acres is covered with trees and needs to be cleared in {number_of_days} days. Your task is to create an efficient work plan considering:

        - Available equipment: ["Chainsaws", "Bulldozers", "Brush Cutters", "Excavators", "Tractors", "Human Power"].
        - Each workday consists of 8 hours.
        - Avoid unnecessary use of large machinery for small areas.
        - Ensure the total hours of work are realistic based on the number of days.
        - Recommend only the required number of workers and machines.
        - Output must be valid JSON format, following this structure:

        {{
            "Total_Tree_Land_Area": "{tree_land_area} acres",
            "Days_Given": "{number_of_days}",
            "Work_Plan": [
                {{
                    "Equipment": "Chainsaws",
                    "Usage_Hours": 30,
                    "Workers_Required": 5
                }},
                {{
                    "Equipment": "Bulldozers",
                    "Usage_Hours": 20,
                    "Workers_Required": 2
                }}
            ],
            "Total_Human_Workers_Needed": 7,
            "Daily_Working_Hours": 8,
            "Feasibility_Status": "Feasible"
        }}

        Ensure the response contains **ONLY** the valid JSON output, without any extra explanation.
        """

        chat_completion = client.chat.completions.create(
            model="gpt-4o",
            max_tokens=500,
            messages=[
                {"role": "system", "content": "You are an expert in land clearing."},
                {"role": "user", "content": prompt},
            ],
        )

        # Extract GPT's response
        response_text = chat_completion.choices[0].message.content.strip()

        # Use regex to extract valid JSON block if GPT returns extra text
        json_match = re.search(r"\{.*\}", response_text, re.DOTALL)
        if json_match:
            response_text = json_match.group(0)  # Extract valid JSON part

        # Safely parse JSON
        try:
            work_plan_json = json.loads(response_text)  # Convert string to JSON
            return work_plan_json
        except json.JSONDecodeError:
            return {
                "error": "GPT returned invalid JSON. Please check the response format."
            }

    except Exception as e:
        return {"error": f"Failed to generate work plan: {str(e)}"}


# API Route: Accepts POST request with JSON input
@app.route("/analyze_land", methods=["POST"])
def analyze_land():
    try:
        # Parse request data
        data = request.json
        number_of_days = data.get("numberOfDays")
        image_url = data.get("imageUrl")
        area = data.get("area")

        if not number_of_days or not image_url or not area:
            return jsonify({"error": "Missing required fields"}), 400

        # Process image to get land percentages
        cleared_land_percentage, tree_land_percentage, error = analyze_image(image_url)

        if error:
            return jsonify({"error": error}), 400

        # Calculate Tree Land Area
        tree_land_area = (tree_land_percentage / 100) * area

        # Generate work plan using GPT
        work_plan = generate_work_plan(tree_land_area, number_of_days)

        # Return JSON response
        return jsonify(
            {
                "Cleared_Land_Percentage": cleared_land_percentage,
                "Tree_Land_Percentage": tree_land_percentage,
                "Tree_Land_Area": round(tree_land_area, 2),
                "Work_Plan": work_plan,
            }
        )

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)
