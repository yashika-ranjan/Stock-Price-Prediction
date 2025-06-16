"""from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import os

# === UTILS ===
from utils.preprocessing import load_and_prepare_data, fetch_latest_data
from utils.model_lstm import predict_lstm
from utils.model_xgb import predict_xgb
from utils.metrics import evaluate_predictions

# === AUTO-TRAIN MODELS ON FIRST LAUNCH ===
from models.train_lstm import train_model as train_lstm_model
from models.train_xgb import train_xgb_model

# Auto-train if models are not found
symbols = ["AAPL", "GOOGL", "META", "MSFT", "NVDA", "TSLA"]
for symbol in symbols:
    lstm_path = f"models/lstm_model_{symbol}.h5"
    xgb_path = f"models/xgb_model_{symbol}.pkl"

    if not os.path.exists(lstm_path):
        print(f"🔄 Training missing LSTM model for {symbol}...")
        train_lstm_model(symbol)

    if not os.path.exists(xgb_path):
        print(f"🔄 Training missing XGBoost model for {symbol}...")
        train_xgb_model(symbol)

# === FLASK APP START ===
app = Flask(__name__)
CORS(app)

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.form
        symbol = data.get("stock")
        days = int(data.get("days"))
        model_type = data.get("model", "").lower()
        use_latest = data.get("useLatest", "true").lower() == "true"

        # Uploaded file support
        custom_file_path = None
        if "file" in request.files:
            uploaded_file = request.files["file"]
            os.makedirs("data", exist_ok=True)
            custom_file_path = f"data/uploaded_{symbol}.csv"
            uploaded_file.save(custom_file_path)
            use_latest = False
        elif use_latest:
            df = fetch_latest_data(symbol)
            temp_path = f"data/temp_{symbol}.csv"
            df.to_csv(temp_path, index=False)
            custom_file_path = temp_path

        # === Load & preprocess ===
        df, close_prices, scaled_data, scaler = load_and_prepare_data(
            symbol=symbol,
            custom_file_path=custom_file_path,
            use_latest=use_latest
        )

        # === Prediction ===
        if model_type == "lstm":
            model_path = f"models/lstm_model_{symbol}.h5"
            scaler_path = f"models/scaler_{symbol}.pkl"

            if not os.path.exists(model_path) or not os.path.exists(scaler_path):
                return jsonify({"error": f"LSTM model for {symbol} not trained yet."}), 404

            predictions = predict_lstm(
                model_path, scaler_path, close_prices, scaled_data,
                days, use_custom=(custom_file_path is not None or use_latest)
            )
            y_true = close_prices[-days:].flatten()

        elif model_type in ["xgboost", "xgb"]:
            model_path = f"models/xgb_model_{symbol}.pkl"

            if not os.path.exists(model_path):
                return jsonify({"error": f"XGBoost model for {symbol} not trained yet."}), 404

            predictions, y_true = predict_xgb(
                model_path, df, days,
                use_custom=(custom_file_path is not None or use_latest)
            )
        else:
            return jsonify({"error": "Invalid model type. Choose 'lstm' or 'xgboost'."}), 400

        # === Output ===
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

@app.route("/models-status", methods=["GET"])
def model_status():
    symbols = ["AAPL", "GOOGL", "META", "MSFT", "NVDA", "TSLA"]
    statuses = {}
    for symbol in symbols:
        statuses[symbol] = {
            "lstm": os.path.exists(f"models/lstm_model_{symbol}.h5"),
            "xgboost": os.path.exists(f"models/xgb_model_{symbol}.pkl")
        }
    return jsonify(statuses)

if __name__ == "__main__":
    app.run(debug=True)
"""




from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import os
import threading

# === UTILS ===
from utils.preprocessing import load_and_prepare_data, fetch_latest_data
from utils.model_lstm import predict_lstm
from utils.model_xgb import predict_xgb
from utils.metrics import evaluate_predictions

# === AUTO-TRAIN MODELS ON FIRST LAUNCH (in background) ===
from models.train_lstm import train_model as train_lstm_model
from models.train_xgb import train_xgb_model

def train_missing_models():
    symbols = ["AAPL", "GOOGL", "META", "MSFT", "NVDA", "TSLA"]
    for symbol in symbols:
        lstm_path = f"models/lstm_model_{symbol}.h5"
        xgb_path = f"models/xgb_model_{symbol}.pkl"

        if not os.path.exists(lstm_path):
            print(f"🔄 Training missing LSTM model for {symbol}...")
            train_lstm_model(symbol)

        if not os.path.exists(xgb_path):
            print(f"🔄 Training missing XGBoost model for {symbol}...")
            train_xgb_model(symbol)

# === FLASK APP START ===
app = Flask(__name__)
CORS(app)

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.form
        symbol = data.get("stock")
        days = int(data.get("days"))
        model_type = data.get("model", "").lower()
        use_latest = data.get("useLatest", "true").lower() == "true"

        # Uploaded file support
        custom_file_path = None
        if "file" in request.files:
            uploaded_file = request.files["file"]
            os.makedirs("data", exist_ok=True)
            custom_file_path = f"data/uploaded_{symbol}.csv"
            uploaded_file.save(custom_file_path)
            use_latest = False
        elif use_latest:
            df = fetch_latest_data(symbol)
            temp_path = f"data/temp_{symbol}.csv"
            df.to_csv(temp_path, index=False)
            custom_file_path = temp_path

        # === Load & preprocess ===
        df, close_prices, scaled_data, scaler = load_and_prepare_data(
            symbol=symbol,
            custom_file_path=custom_file_path,
            use_latest=use_latest
        )

        # === Prediction ===
        if model_type == "lstm":
            model_path = f"models/lstm_model_{symbol}.h5"
            scaler_path = f"models/scaler_{symbol}.pkl"

            if not os.path.exists(model_path) or not os.path.exists(scaler_path):
                return jsonify({"error": f"LSTM model for {symbol} not trained yet."}), 404

            predictions = predict_lstm(
                model_path, scaler_path, close_prices, scaled_data,
                days, use_custom=(custom_file_path is not None or use_latest)
            )
            y_true = close_prices[-days:].flatten()

        elif model_type in ["xgboost", "xgb"]:
            model_path = f"models/xgb_model_{symbol}.pkl"

            if not os.path.exists(model_path):
                return jsonify({"error": f"XGBoost model for {symbol} not trained yet."}), 404

            predictions, y_true = predict_xgb(
                model_path, df, days,
                use_custom=(custom_file_path is not None or use_latest)
            )
        else:
            return jsonify({"error": "Invalid model type. Choose 'lstm' or 'xgboost'."}), 400

        # === Output ===
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

@app.route("/models-status", methods=["GET"])
def model_status():
    symbols = ["AAPL", "GOOGL", "META", "MSFT", "NVDA", "TSLA"]
    statuses = {}
    for symbol in symbols:
        statuses[symbol] = {
            "lstm": os.path.exists(f"models/lstm_model_{symbol}.h5"),
            "xgboost": os.path.exists(f"models/xgb_model_{symbol}.pkl")
        }
    return jsonify(statuses)

if __name__ == "__main__":
    # Start model training in background
    threading.Thread(target=train_missing_models).start()

    # Bind to 0.0.0.0 and correct port
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
