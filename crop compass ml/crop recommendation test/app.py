import pickle
import numpy as np
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  
# LOad Model
MODEL_PATH = "models/crop_model.pkl"

try:
    with open(MODEL_PATH, "rb") as f:
        model, scaler, label_encoder = pickle.load(f)
    print(" Model, scaler, and label encoder loaded successfully!")
except Exception as e:
    print(f"Error loading model components: {e}")
    model, scaler, label_encoder = None, None, None

# Home route
@app.route("/")
def index():
    """Renders the HTML form when you visit http://127.0.0.1:5001"""
    return render_template("index.html")

# predict route
@app.route("/predict", methods=["POST"])
def predict():
    if model is None or scaler is None or label_encoder is None:
        return jsonify({"error": "Model components failed to load."}), 500

    try:
        # handle input data
        if request.is_json:
            data = request.json
        else:
            data = request.form
        
        # Convert data into float
        features = [
            float(data["boron"]),
            float(data["clay"]),
            float(data["nitrogen"]),
            float(data["organic"]),
            float(data["k"]),
            float(data["p2o5"]),
            float(data["ph"]),
            float(data["sand"]),
            float(data["slit"]),
            float(data["zinc"]),
            float(data["avg_temp"]),
            float(data["avg_rain"]),
        ]

        # Machine Learning Logic
        X = np.array(features).reshape(1, -1)
        X_scaled = scaler.transform(X)
        pred_encoded = model.predict(X_scaled)
        crop = label_encoder.inverse_transform(pred_encoded)[0]

        # Return with crop
        if not request.is_json:
            return render_template("index.html", prediction=str(crop))

        # return JSON response
        return jsonify({"recommendation": str(crop)})

    except Exception as e:
        # Error
        return jsonify({"error": str(e)}), 400

# Run server
if __name__ == "__main__":
    # run on port 5001
    app.run(port=5001, debug=True)