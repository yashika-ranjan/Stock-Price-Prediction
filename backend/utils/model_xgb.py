
import numpy as np
import pandas as pd
import joblib
from sklearn.preprocessing import MinMaxScaler

def predict_xgb(model_path, df, forecast_days, use_custom=False):
    if use_custom:
        df['Log_Volume'] = np.log(df['Volume'] + 1)
        df.drop(columns=['Volume'], inplace=True)
        features = df[['Open', 'High', 'Low', 'Close', 'Adj Close', 'Log_Volume']]
        scaler = MinMaxScaler()
        features_scaled = scaler.fit_transform(features)
        model = joblib.load("backend/models/xgb_model_AAPL.pkl")  # fallback
    else:
        df['Log_Volume'] = np.log(df['Volume'] + 1)
        df.drop(columns=['Volume'], inplace=True)
        features = df[['Open', 'High', 'Low', 'Close', 'Adj Close', 'Log_Volume']]
        scaler = joblib.load(model_path.replace("xgb_model_", "xgb_scaler_"))
        features_scaled = scaler.transform(features)
        model = joblib.load(model_path)

    last_row = features_scaled[-1]
    predictions = [model.predict(last_row.reshape(1, -1))[0] for _ in range(forecast_days)]

    return np.array(predictions), df['Close'][-forecast_days:].values
