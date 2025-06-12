
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score

def evaluate_predictions(y_true, y_pred):
    return {
        "RMSE": round(mean_squared_error(y_true, y_pred, squared=False), 4),
        "MAE": round(mean_absolute_error(y_true, y_pred), 4),
        "R2": round(r2_score(y_true, y_pred), 4)
    }


