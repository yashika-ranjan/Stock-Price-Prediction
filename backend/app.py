
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import os

# Import utilities
from utils.preprocessing import load_and_prepare_data, fetch_latest_data
from utils.model_lstm import predict_lstm
from utils.model_xgb import predict_xgb
from utils.metrics import evaluate_predictions

app = Flask(__name__)
CORS(app)

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.form
        symbol = data.get("stock")
        days = int(data.get("days"))
        model_type = data.get("model").lower()
        use_latest = data.get("useLatest", "true").lower() == "true"

        # Handle uploaded CSV if provided
        custom_file_path = None
        if "file" in request.files:
            uploaded_file = request.files["file"]
            os.makedirs("backend/data", exist_ok=True)
            custom_file_path = f"backend/data/uploaded_{symbol}.csv"
            uploaded_file.save(custom_file_path)
            use_latest = False
        elif use_latest:
            df = fetch_latest_data(symbol)
            temp_path = f"backend/data/temp_{symbol}.csv"
            df.to_csv(temp_path, index=False)
            custom_file_path = temp_path

        # Load and preprocess data
        df, close_prices, scaled_data, scaler = load_and_prepare_data(
            symbol=symbol,
            custom_file_path=custom_file_path,
            use_latest=use_latest
        )

        # Run model prediction
        if model_type == "lstm":
            model_path = f"backend/models/lstm_model_{symbol}.h5"
            scaler_path = f"backend/models/scaler_{symbol}.pkl"
            predictions = predict_lstm(
                model_path,
                scaler_path,
                close_prices,
                scaled_data,
                days,
                use_custom=(custom_file_path is not None or use_latest)
            )
            y_true = close_prices[-days:].flatten()

        elif model_type == "xgboost" or model_type == "xgb":
            model_path = f"backend/models/xgb_model_{symbol}.pkl"
            predictions, y_true = predict_xgb(
                model_path,
                df,
                days,
                use_custom=(custom_file_path is not None or use_latest)
            )
        else:
            return jsonify({"error": "Invalid model type. Choose 'lstm' or 'xgboost'."}), 400

        # Forecast dates and metrics
        forecast_dates = pd.date_range(df.index[-1], periods=days + 1, freq="D")[1:]
        metrics = evaluate_predictions(
            y_true,
            predictions[:, 0] if len(predictions.shape) > 1 else predictions
        )

        return jsonify({
            "dates": forecast_dates.strftime("%Y-%m-%d").tolist(),
            "actualPrices": y_true.tolist(),
            "predictedPrices": predictions[:, 0].tolist() if len(predictions.shape) > 1 else predictions.tolist(),
            "metrics": metrics
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/")
def health():
    return "✅ QuantPredict Backend Running"


if __name__ == "__main__":
    app.run(debug=True)
