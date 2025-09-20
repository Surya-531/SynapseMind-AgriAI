from flask import Flask, request, jsonify
import joblib
import pandas as pd
import numpy as np

app = Flask(__name__)

# Load model and preprocessing artifacts
model = joblib.load(r"crop_yield_model.joblib")
encoders = joblib.load(r"label_encoders.pkl")
feature_columns = joblib.load(r"feature_columns.pkl")

def preprocess_input(data: dict):
    # Build a DataFrame with expected feature columns
    df = pd.DataFrame([data])
    # Ensure all required feature columns exist (fill missing with defaults)
    for col in feature_columns:
        if col not in df.columns:
            # if numeric column missing, fill with 0; if categorical, fill with 'missing' string
            df[col] = 0

    # Apply same fills as during training: numeric kept as-is (assume user sends numeric),
    # categorical encoded using saved LabelEncoders
    for col, le in encoders.items():
        if col in df.columns:
            # convert to string first then transform; if unseen label, will be handled below
            vals = df[col].astype(str).tolist()
            # handle unseen labels by mapping to a new integer (we'll add unseen labels to classes_)
            transformed = []
            for v in vals:
                if v in le.classes_:
                    transformed.append(int(le.transform([v])[0]))
                else:
                    # unseen label: append -1 (you can change strategy)
                    transformed.append(-1)
            df[col] = transformed

    # Ensure columns are in the same order as feature_columns
    df = df.reindex(columns=feature_columns, fill_value=0)
    return df

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json(force=True)
    df = preprocess_input(data)
    preds = model.predict(df)
    pred_value = float(preds[0])
    return jsonify({"predicted_yield": round(pred_value, 3)})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
