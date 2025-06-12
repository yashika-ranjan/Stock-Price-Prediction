

import pandas as pd
import numpy as np
import joblib
from sklearn.preprocessing import MinMaxScaler
import yfinance as yf
import os

def fetch_latest_data(symbol):
    df = yf.download(symbol, start="2020-01-01", end="2025-05-31", interval="1d")
    df.reset_index(inplace=True)
    return df

def load_and_prepare_data(symbol=None, custom_file_path=None, use_latest=False):
    if custom_file_path:
        # Skip second header row (if present)
        df = pd.read_csv(custom_file_path, skiprows=[1])
    elif use_latest:
        df = fetch_latest_data(symbol)
    else:
        df = pd.read_csv(f"data/{symbol}.csv", skiprows=[1])

    # Clean up column names
    df.columns = df.columns.str.strip()

    # Drop unwanted or unnamed columns
    df = df.loc[:, ~df.columns.str.contains('^Unnamed', case=False)]
    if 'Ticker' in df.columns:
        df.drop(columns=['Ticker'], inplace=True)

    # Ensure Date column exists and is datetime
    if 'Date' in df.columns:
        df['Date'] = pd.to_datetime(df['Date'], errors='coerce')
        df.dropna(subset=['Date'], inplace=True)
        df.set_index('Date', inplace=True)
    else:
        raise ValueError("Missing 'Date' column.")

    df.sort_index(inplace=True)

    # Volume handling
    df['Volume'] = pd.to_numeric(df['Volume'], errors='coerce').fillna(0)
    df['Log_Volume'] = np.log(df['Volume'] + 1)
    df.drop(columns=['Volume'], inplace=True)

    # Handle missing 'Adj Close'
    if 'Adj Close' not in df.columns:
        df['Adj Close'] = df['Close']

    # Ensure all expected feature columns are present
    feature_cols = ['Open', 'High', 'Low', 'Close', 'Adj Close', 'Log_Volume']
    missing_cols = [col for col in feature_cols if col not in df.columns]
    if missing_cols:
        raise ValueError(f"Missing required columns: {missing_cols}")

    df = df[feature_cols]
    df.dropna(inplace=True)

    features_array = df.values  # numpy array without column names

    # Scaler setup
    scaler_path = f"models/scaler_{symbol}.pkl"
    if os.path.exists(scaler_path):
        scaler = joblib.load(scaler_path)
        scaled_data = scaler.transform(features_array)
    else:
        scaler = MinMaxScaler()
        scaled_data = scaler.fit_transform(features_array)
        os.makedirs("models", exist_ok=True)
        joblib.dump(scaler, scaler_path)

    return df, features_array, scaled_data, scaler









