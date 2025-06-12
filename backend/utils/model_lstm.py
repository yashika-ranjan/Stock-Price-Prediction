
import numpy as np
from tensorflow.keras.models import load_model
import joblib
from sklearn.preprocessing import MinMaxScaler

def predict_lstm(model_path, scaler_path, raw_features, scaled_data, forecast_days, window_size=60, use_custom=False):
    if use_custom:
        scaler = MinMaxScaler()
        scaled_data = scaler.fit_transform(raw_features)
        model = load_model("backend/models/lstm_model_AAPL.h5")  # fallback
    else:
        model = load_model(model_path)
        scaler = joblib.load(scaler_path)

    input_seq = scaled_data[-window_size:]
    predictions = []

    for _ in range(forecast_days):
        X = input_seq[-window_size:].reshape(1, window_size, scaled_data.shape[1])
        pred_scaled = model.predict(X, verbose=0)[0]
        predictions.append(pred_scaled)
        input_seq = np.append(input_seq, [pred_scaled], axis=0)

    predicted_features = scaler.inverse_transform(np.array(predictions))
    return predicted_features

