
import numpy as np
import os
import joblib
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
from tensorflow.keras.callbacks import EarlyStopping, ReduceLROnPlateau
from utils.preprocessing import load_and_prepare_data

def train_model(symbol):
    try:
        df, features, scaled, scaler = load_and_prepare_data(symbol=symbol)

        sequence_length = 60
        X, y = [], []

        for i in range(sequence_length, len(scaled)):
            X.append(scaled[i - sequence_length:i])
            y.append(scaled[i][3])  # Close price

        X, y = np.array(X), np.array(y)

        model = Sequential()
        model.add(LSTM(64, return_sequences=True, input_shape=(X.shape[1], X.shape[2])))
        model.add(Dropout(0.2))
        model.add(LSTM(64))
        model.add(Dropout(0.2))
        model.add(Dense(1))

        model.compile(optimizer="adam", loss="mean_squared_error")

        callbacks = [
            EarlyStopping(patience=5, monitor='loss', restore_best_weights=True),
            ReduceLROnPlateau(patience=3, factor=0.5)
        ]

        model.fit(X, y, epochs=30, batch_size=32, callbacks=callbacks, verbose=1)

        os.makedirs("models", exist_ok=True)
        model.save(f"models/lstm_model_{symbol}.h5")
        joblib.dump(scaler, f"models/scaler_{symbol}.pkl")

        print(f"✅ Trained and saved improved LSTM for {symbol}")

    except Exception as e:
        print(f"❌ Error training model for {symbol}: {e}")

if __name__ == "__main__":
    symbols = ["AAPL", "GOOGL", "META", "MSFT", "NVDA", "TSLA"]
    for symbol in symbols:
        print(f"\n=== Training LSTM model for {symbol} ===")
        train_model(symbol)
