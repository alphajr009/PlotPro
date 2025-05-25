from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from dotenv import load_dotenv
from openai import OpenAI
import os
import json
import re  # Import regex for extracting JSON from GPT response

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


@app.route("/analyze-text", methods=["POST"])
def analyze_text():
    data = request.json
    crops = data.get("crops")

    if not crops:
        return jsonify({"error": "Crops input is required"}), 400

    # Define the prompt to strictly enforce JSON response without descriptions
    prompt = f"""
    You are an expert in agricultural farming. Return ONLY the following JSON format with NO extra text or explanations:

    {{
        "response": {{
            "optimal_conditions": "Best growing conditions for {crops}",
            "watering instructions": "Watering recommendations for {crops}",
            "Best fertilizers": {{
                "1st best one": "Best fertilizer method for {crops}",
                "2nd best one": "Second best fertilizer method for {crops}"
            }},
            "crop companion": {{
                "Companion Crop 1": "Why {crops} grows well with this crop",
                "Companion Crop 2": "Why {crops} grows well with this crop",
                "Companion Crop 3": "Why {crops} grows well with this crop"
            }},
            "crop rotation": {{
                "Rotation Crop 1": "Why rotating {crops} with this crop is beneficial",
                "Rotation Crop 2": "Why rotating {crops} with this crop is beneficial",
                "Rotation Crop 3": "Why rotating {crops} with this crop is beneficial"
            }}
        }}
    }}
    """

    try:
        chat_completion = client.chat.completions.create(
            model="gpt-4o",
            max_tokens=1000,
            messages=[{"role": "user", "content": prompt}],
        )

       
        response_text = chat_completion.choices[0].message.content.strip()

       
        print("Raw GPT Response:\n", response_text)

        # Use regex to extract valid JSON block if GPT returns extra text
        json_match = re.search(r"\{.*\}", response_text, re.DOTALL)
        if json_match:
            response_text = json_match.group(0)  # Extract valid JSON part

        # Parse JSON safely
        try:
            response_json = json.loads(response_text)  # Convert string to JSON
            return jsonify(response_json)
        except json.JSONDecodeError:
            return (
                jsonify(
                    {
                        "error": "GPT returned invalid JSON. Please check the response format.",
                        "raw_response": response_text,
                    }
                ),
                500,
            )

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5002)
