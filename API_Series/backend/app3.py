from flask import Flask, request, jsonify
from dotenv import load_dotenv
from openai import OpenAI
from flask_cors import CORS  # Import CORS for frontend API requests
import os
import base64
import json
import re
import requests
from datetime import datetime

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(
    app, resources={r"/*": {"origins": "*"}}
)  # Allow all origins to prevent CORS errors

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Ensure uploads folder exists
UPLOAD_FOLDER = "./uploads/"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# Function to download and save the image
def download_image(image_url, save_path):
    try:
        response = requests.get(image_url, timeout=10)
        if response.status_code == 200:
            with open(save_path, "wb") as f:
                f.write(response.content)
            return save_path
        else:
            return None
    except Exception as e:
        print(f"Error downloading image: {e}")
        return None


# Function to encode an image to base64
def encode_image(file_path):
    if not os.path.exists(file_path):
        return None
    with open(file_path, "rb") as image:
        return base64.b64encode(image.read()).decode("utf-8")


# Function to determine the current cultivation season in Sri Lanka
def get_current_season():
    month = datetime.now().month
    return "Yala" if 5 <= month <= 9 else "Maha Kannya"


@app.route("/analyze-image", methods=["POST"])
def analyze_image():
    try:
        data = request.json
        image_url = data.get("image_url")
        latitude = data.get("latitude")
        longitude = data.get("longitude")

        if not image_url or latitude is None or longitude is None:
            return (
                jsonify(
                    {
                        "error": "Missing required fields (image_url, latitude, longitude)"
                    }
                ),
                400,
            )

        # Download image to local folder
        image_filename = os.path.join(UPLOAD_FOLDER, "uploaded_soil.jpg")
        saved_image = download_image(image_url, image_filename)

        if not saved_image:
            return jsonify({"error": "Failed to download image"}), 500

        # Convert image to base64
        base64_image = encode_image(saved_image)

        if not base64_image:
            return jsonify({"error": "Image encoding failed"}), 500

        # Get the current cultivation season
        current_season = get_current_season()

        # Define the OpenAI prompt
        prompt = f"""
        Identify the soil type from the given image and analyze climate conditions for Latitude: {latitude}, Longitude: {longitude}.
        
        1. Determine the soil type (Alluvial, Black, Clay, or Red) from the image.
        2. Estimate the **average humidity** and **average rainfall** for the given location based on reliable climate data sources.
        3. Consider the **current cultivation season** in Sri Lanka (**{current_season}**) for crop recommendations.
        4. Recommend the **most suitable crops** for the location based on soil type, humidity, rainfall, and season.

        **Response Format:** 
        - Return ONLY the following JSON format.
        - **DO NOT** add explanations, comments, or any extra text.
        
        ```json
        {{
            "response": {{
                "soil_type": "Identified Soil Type",
                "average_humidity": "Humidity %",
                "average_rainfall": "Rainfall mm",
                "season": "{current_season}",
                "suggested_crops": ["Crop1", "Crop2", "Crop3"]
            }}
        }}
        ```
        """

        # Send request to OpenAI
        chat_completion = client.chat.completions.create(
            model="gpt-4o",
            max_tokens=500,
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": prompt},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{base64_image}"
                            },
                        },
                    ],
                }
            ],
        )

        # Extract GPT's response
        response_text = chat_completion.choices[0].message.content.strip()

        # Use regex to extract valid JSON block if GPT returns extra text
        json_match = re.search(r"\{.*\}", response_text, re.DOTALL)
        if json_match:
            response_text = json_match.group(0)

        # Safely parse JSON
        try:
            response_json = json.loads(response_text)
            return jsonify(response_json)
        except json.JSONDecodeError:
            return jsonify({"error": "Invalid JSON format from GPT"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5003)
