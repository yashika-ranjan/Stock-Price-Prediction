import yfinance as yf
import os

# Create data folder if it doesn't exist
os.makedirs("data", exist_ok=True)

symbols = ["AAPL", "GOOGL", "MSFT", "TSLA", "NVDA", "META"]

for symbol in symbols:
    df = yf.download(symbol, start="2020-01-01",end="2025-05-31", interval="1d")
    df.reset_index(inplace=True)
    df.to_csv(f"data/{symbol}.csv")
    print(f"✅ Downloaded: {symbol}")
