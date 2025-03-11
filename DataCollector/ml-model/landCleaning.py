from flask import Flask, request, jsonify
import joblib  # For loading your machine learning model
# import tensorflow as tf  # Uncomment if you're using TensorFlow
# from sklearn.externals import joblib  # Uncomment if using sklearn models

app = Flask()

# Load your trained model
model = joblib.load('Cleaning.pkl')  # Replace with the path to your model file
# model = tf.keras.models.load_model('your_model.h5')  # Use if you have a TensorFlow model

@app.route('/land_cleaning', methods=['POST'])
def land_cleaning():
    try:
        # Get the JSON data from the request
        data = request.get_json()

        # Extract the necessary inputs for the model (for example, terrain features)
        terrain_features = data['terrain_features']  # Adjust based on your model's inputs

        # Preprocess the data if needed (e.g., scaling, encoding)
        # For example, if your model needs normalized values, apply the transformation

        # Predict with the model
        prediction = model.predict([terrain_features])  # Adjust according to model's input

        # Process the prediction (e.g., return the predicted cleaning method, score, etc.)
        result = {
            'cleaning_method': prediction[0],  # Adjust this to match your output structure
            'confidence': 0.85  # Example confidence score, replace with actual if applicable
        }

        # Return the result as JSON
        return jsonify(result)

    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
