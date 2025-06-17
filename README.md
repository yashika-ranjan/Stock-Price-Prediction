# QuantPredict — AI-Powered Stock Price Forecasting

QuantPredict is a production-ready full-stack web application that leverages **Deep Learning (LSTM)** and **Machine Learning (XGBoost)** to forecast stock prices. Users can choose from major stocks like AAPL, GOOGL, META, MSFT, NVDA, and TSLA, or upload their own CSV data.
Get accurate forecasts, rich metrics (RMSE, MAE, Accuracy), and interactive charts — all in one smooth interface.

---

## Features

-  Predict stock prices for major tech stocks: `AAPL`, `GOOGL`, `META`, `MSFT`, `NVDA`, `TSLA`
-  Choose between **LSTM (RNN)** or **XGBoost (Tree-based ML)** models
-  Upload your own CSV datasets
-  Visualize predictions with a smooth interactive charts for predictions vs actuals
-  Evaluation metrics: `RMSE`, `MAE`, `Accuracy`
-  Deploy-ready on **Render (backend)** and **Vercel (frontend)**

---

## Models Used

| Model     | Type         | Description                                 |
|-----------|--------------|---------------------------------------------|
| LSTM      | Deep Learning | Captures long-term temporal dependencies    |
| XGBoost   | ML (Boosting) | Fast, powerful gradient boosting algorithm  |

---

## Tech Stack

| Layer     | Tools & Frameworks                                 |
|-----------|----------------------------------------------------|
| Frontend  | React.js, TypeScript, Tailwind CSS, Vite, Recharts     |
| Backend   | Python, Flask, Flask-CORS, scikit-learn, TensorFlow/keras, XGBoost, Pandas, NumPy   |
| Data      | `yfinance` API + CSV Upload                        |
| Deployment| Vercel (frontend), Render (backend)                |

---

##  Project Structure
```
Stock-Estimate/
├── backend/
│   ├── app.py                 # Flask server
│   ├── download_datasets.py  # Downloads the dataset
│   ├── data/                 # Sample & uploaded CSVs
│   ├── models/
│   │   ├── train_lstm.py     # Trains LSTM model
│   │   ├── train_xgb.py      # Trains XGBoost
│   │   └── (model)           # Trained .h5 & .pkl models
│   ├── utils/
│   │   ├── preprocessing.py  # Cleans + scales input data
│   │   ├── model_lstm.py     # LSTM inference logic
│   │   ├── model_xgb.py      # XGBoost inference logic
│   │   └── metrics.py        # Accuracy, RMSE, MAE
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/       # UI components
│   │   ├── pages/            # Home + result screens
│   │   ├── hooks/            # Custom form/data hooks
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── postcss.config.cjs
│   └── vite.config.ts
├── .gitignore
└── README.md

```
##  Live Demo

 **Website**: [https://stock-price-prediction-olive.vercel.app/](https://stock-price-prediction-olive.vercel.app/)  

---

---

##  Sample UI Screens

| Main Dashboard | Prediction Chart  | Metrics |
|----------------|-------------------|---------|
| ![UI Screenshot1](https://github.com/yashika-ranjan/Stock-Price-Prediction/blob/main/frontend/public/Main%20Dashboard%201.png)|![UI Screenshot3](https://github.com/yashika-ranjan/Stock-Price-Prediction/blob/main/frontend/public/Prediction%20Chart.png)|![UI Screenshot4](https://github.com/yashika-ranjan/Stock-Price-Prediction/blob/main/frontend/public/Metrics.png)|
![UI Screenshot2](https://github.com/yashika-ranjan/Stock-Price-Prediction/blob/main/frontend/public/Main%20Dashboard%202.png)|


---

##  How to Run Locally

###  Backend (Flask)
```
cd backend
python -m venv venv
venv/Scripts/activate
pip install -r requirements.txt
python app.py
```

###  Frontend (React)
```
cd frontend
npm install
npm run dev
```

---

##  API Usage

### `POST /analyze`
**Request:**
```json
{
  "stock": "AAPL",
  "days": 7,
  "model": "lstm",
  "useLatest": true
}

```

**Response:**
```json
{
  "dates": [...],
  "actualPrices": [...],
  "predictedPrices": [...],
  "metrics": {
    "accuracy": 95.24,
    "rmse": 1.12,
    "mae": 0.95
  }
}

}
```

---

##  DEveloper

**Yashika Ranjan**  
 B.Tech CSE, Delhi Technological University (DTU)

---

##  GitHub Repo

[👉 View Source Code](https://github.com/yashika-ranjan/Sentiment_Analysis)
