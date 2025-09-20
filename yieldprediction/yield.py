import joblib
import pandas as pd

# Load model and preprocessing artifacts
model = joblib.load("crop_yield_model.joblib")
encoders = joblib.load("label_encoders.pkl")
feature_columns = joblib.load("feature_columns.pkl")

def preprocess_input(data: dict):
    """Prepare input dict into DataFrame for model prediction."""
    df = pd.DataFrame([data])

    # Fill missing feature columns with defaults
    for col in feature_columns:
        if col not in df.columns:
            df[col] = 0

    # Apply label encoders for categorical columns
    for col, le in encoders.items():
        if col in df.columns:
            vals = df[col].astype(str).tolist()
            transformed = []
            for v in vals:
                if v in le.classes_:
                    transformed.append(int(le.transform([v])[0]))
                else:
                    # unseen category → -1
                    transformed.append(-1)
            df[col] = transformed

    # Reorder columns
    df = df.reindex(columns=feature_columns, fill_value=0)
    return df

def predict_yield(input_data: dict):
    """Run prediction on given input dict."""
    df = preprocess_input(input_data)
    pred = model.predict(df)[0]
    return round(float(pred), 3)

if __name__ == "__main__":
    # Example input (replace with your values)
    input_data = {
        "Nitrogen": 90,
        "Phosphorus": 42,
        "Potassium": 43,
        "Temperature": 20.88,
        "Humidity": 82.0,
        "pH_Value": 6.5,
        "Rainfall": 202.93,
        "Crop": "Rice"
    }

    result = predict_yield(input_data)
    print(f"Predicted Yield: {result}")
