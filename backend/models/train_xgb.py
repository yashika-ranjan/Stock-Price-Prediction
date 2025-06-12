
import numpy as np
import os
import joblib
import pandas as pd
from xgboost import XGBRegressor
from sklearn.preprocessing import MinMaxScaler
from utils.preprocessing import load_and_prepare_data

def train_xgb_model(symbol):
    try:
        df, features, scaled, scaler = load_and_prepare_data(symbol=symbol)

        X = scaled[:-1]
        y = features[1:, 3]  # Close price column (index 3)

        model = XGBRegressor(
            n_estimators=300,
            learning_rate=0.05,
            max_depth=7,
            subsample=0.8,
            colsample_bytree=0.8,
            objective='reg:squarederror',
            n_jobs=-1,
            random_state=42
        )

        model.fit(X, y)

        model_dir = "models"
        os.makedirs(model_dir, exist_ok=True)
        joblib.dump(model, f"{model_dir}/xgb_model_{symbol}.pkl")
        joblib.dump(scaler, f"{model_dir}/xgb_scaler_{symbol}.pkl")

        print(f"✅ Trained and saved improved XGBoost for {symbol}")

    except Exception as e:
        print(f"❌ Error training XGBoost model for {symbol}: {e}")

if __name__ == "__main__":
    symbols = ["AAPL", "GOOGL", "META", "MSFT", "NVDA", "TSLA"]
    for symbol in symbols:
        print(f"\n=== Training XGBoost model for {symbol} ===")
        train_xgb_model(symbol)
