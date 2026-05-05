import pickle
import numpy as np

# --- Paths to saved files ---
MODEL_PATH = r"C:\Users\Adarsha\Documents\github projects\crop recommendation system\scrape data\soil data\crop recommendation test\models\crop_model.pkl"
SCALER_PATH = r"C:\Users\Adarsha\Documents\github projects\crop recommendation system\scrape data\soil data\crop recommendation test\models\scaler.pkl"
LABEL_PATH = r"C:\Users\Adarsha\Documents\github projects\crop recommendation system\scrape data\soil data\crop recommendation test\models\label_encoder.pkl"

# --- Load model, scaler, and label encoder ---
with open(MODEL_PATH, "rb") as f:
    model = pickle.load(f)

with open(SCALER_PATH, "rb") as f:
    scaler = pickle.load(f)

with open(LABEL_PATH, "rb") as f:
    label_encoder = pickle.load(f)

print("Model, scaler, and label encoder loaded successfully!")

# --- Function to predict crop ---
def predict_crop(soil_data):
    """
    soil_data: dict with keys
        'ph', 'nitrogen', 'p2o5', 'k', 'avg_temp', 'avg_rain', 'organic',
        'clay', 'sand', 'slit', 'boron', 'zinc'
    Returns: predicted crop as string
    """
    X = np.array([[
        soil_data.get("ph", 6.5),
        soil_data.get("nitrogen", 0.07),
        soil_data.get("p2o5", 30),
        soil_data.get("k", 80),
        soil_data.get("avg_temp", 25),
        soil_data.get("avg_rain", 700),
        soil_data.get("organic", 1.5),
        soil_data.get("clay", 15),
        soil_data.get("sand", 40),
        soil_data.get("slit", 45),
        soil_data.get("boron", 1.0),
        soil_data.get("zinc", 0.1)
    ]])
    
    X_scaled = scaler.transform(X)
    pred_encoded = model.predict(X_scaled)
    pred_crop = label_encoder.inverse_transform(pred_encoded)
    
    return pred_crop[0]

# --- Example usage ---
if __name__ == "__main__":
    sample_soil = {
        "ph": 6.5,
        "nitrogen": 0.07,
        "p2o5": 30,
        "k": 80,
        "avg_temp": 25,
        "avg_rain": 700,
        "organic": 1.5,
        "clay": 15,
        "sand": 40,
        "slit": 45,
        "boron": 1.0,
        "zinc": 0.1
    }
    
    predicted_crop = predict_crop(sample_soil)
    print("Predicted crop:", predicted_crop)
