from sklearn.linear_model import LinearRegression
import pandas as pd

def predict_trend(data):
    """
    Predicts future financial trend based on simple linear regression.
    `data` must be a list of dicts with 'month' (YYYY-MM) and 'amount' keys.
    
    Example input:
    [
        {"month": "2024-01", "amount": 500},
        {"month": "2024-02", "amount": 600},
        ...
    ]
    """
    if not data:
        return {"error": "No data provided"}

    try:
        # Convert to DataFrame
        df = pd.DataFrame(data)
        df['month'] = pd.to_datetime(df['month'])
        df['month_num'] = df['month'].dt.month + (df['month'].dt.year - df['month'].dt.year.min()) * 12

        # Train model
        X = df[['month_num']]
        y = df['amount']
        model = LinearRegression()
        model.fit(X, y)

        # Predict next month's value
        next_month = [[df['month_num'].max() + 1]]
        prediction = model.predict(next_month)

        return {
            "prediction_month": int(next_month[0][0]),
            "predicted_amount": round(float(prediction[0]), 2)
        }

    except Exception as e:
        return {"error": str(e)}
