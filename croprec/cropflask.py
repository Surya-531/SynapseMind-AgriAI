# flask_crop_recommendation_app.py
from flask import Flask, request, jsonify
import joblib
import pandas as pd
import numpy as np
import traceback

app = Flask(__name__)

# Paths (assumes files are in the same directory as this script)
MODEL_PATH = "crop_recommendation_model.joblib"
ENCODERS_PATH = "crop_recommendation_label_encoders.pkl"
FEATURES_PATH = "crop_recommendation_feature_columns.pkl"
TARGET_ENCODER_PATH = "crop_recommendation_target_encoder.pkl"

# Load artifacts
model = joblib.load(MODEL_PATH)
label_encoders = joblib.load(ENCODERS_PATH)      # dict: {col: LabelEncoder}
feature_columns = joblib.load(FEATURES_PATH)     # list of feature column names
target_encoder = joblib.load(TARGET_ENCODER_PATH)

def preprocess_input(data: dict):
    """
    Builds a DataFrame matching feature_columns, applies label encoders where needed,
    and returns the DataFrame ready for model.predict.
    """
    # Build dataframe from input
    df = pd.DataFrame([data])

    # Ensure expected columns exist; fill missing numeric cols with 0 and categorical with 'missing'
    for col in feature_columns:
        if col not in df.columns:
            df[col] = 0

    # Apply label encoders for categorical columns saved earlier
    for col, le in (label_encoders.items() if isinstance(label_encoders, dict) else []):
        if col in df.columns:
            # convert value to string before transforming (encoders were trained on strings)
            value = str(df.at[0, col])
            if value in le.classes_:
                df[col] = int(le.transform([value])[0])
            else:
                # unseen label: choose -1 (consistent with earlier scripts) or nearest fallback
                # Some models can't accept -1 for categorical; if that happens, set to mode (0)
                try:
                    df[col] = -1
                except Exception:
                    df[col] = 0

    # Reorder columns exactly as training
    df = df.reindex(columns=feature_columns, fill_value=0)

    # Convert dtypes to numeric where possible
    for c in df.columns:
        # preserve encoded categorical ints but try to coerce numeric columns
        try:
            df[c] = pd.to_numeric(df[c], errors='ignore')
        except Exception:
            pass

    return df

@app.route("/predict", methods=["POST"])
def predict():
    try:
        payload = request.get_json(force=True)
        if not payload:
            return jsonify({"error": "Empty JSON payload"}), 400

        # Preprocess
        X = preprocess_input(payload)

        # Predict
        pred_idx = model.predict(X)[0]
        pred_label = target_encoder.inverse_transform([int(pred_idx)])[0]

        # Optionally include probability if model supports predict_proba
        proba = None
        if hasattr(model, "predict_proba"):
            try:
                probs = model.predict_proba(X)[0]
                # get probability of predicted class
                proba = float(np.max(probs))
            except Exception:
                proba = None

        resp = {"recommended_crop": pred_label}
        if proba is not None:
            resp["confidence"] = round(proba, 4)

        return jsonify(resp)

    except Exception as e:
        traceback_str = traceback.format_exc()
        return jsonify({"error": str(e), "trace": traceback_str}), 500

@app.route("/", methods=["GET"])
def home():
    return (
        "Crop Recommendation API. POST JSON to /predict with features: "
        f"{feature_columns}. Example: {{'N':90,'P':42,'K':43,'temperature':22.5,'humidity':80,'ph':6.5,'rainfall':200}}"
    )

if __name__ == "__main__":
    # change host/port as needed
    app.run(host="0.0.0.0", port=5000, debug=True)
