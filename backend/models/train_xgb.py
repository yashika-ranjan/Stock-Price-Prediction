import numpy as np
import os
import joblib
import pandas as pd
from xgboost import XGBRegressor
from utils.preprocessing import load_and_prepare_data

def train_xgb_model(symbol):
    model_path = f"models/xgb_model_{symbol}.pkl"
    scaler_path = f"models/xgb_scaler_{symbol}.pkl"

    # ✅ Skip retraining if model already exists
    if os.path.exists(model_path) and os.path.exists(scaler_path):
        print(f"✅ XGBoost model for {symbol} already exists. Skipping training.")
        return

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

        os.makedirs("models", exist_ok=True)
        joblib.dump(model, model_path)
        joblib.dump(scaler, scaler_path)

        print(f"✅ Trained and saved improved XGBoost for {symbol}")

    except Exception as e:
        print(f"❌ Error training XGBoost model for {symbol}: {e}")

if __name__ == "__main__":
    symbols = ["AAPL", "GOOGL", "META", "MSFT", "NVDA", "TSLA"]
    for symbol in symbols:
        print(f"\n=== Training XGBoost model for {symbol} ===")
        train_xgb_model(symbol)
