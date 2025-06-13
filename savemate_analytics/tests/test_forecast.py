import os
import sys
import pytest

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from app.analytics import predict_trend


def test_predict_trend_returns_prediction():
    data = [
        {"month": "2024-01", "amount": 100},
        {"month": "2024-02", "amount": 150},
    ]
    result = predict_trend(data)
    assert "predicted_amount" in result
    assert result["prediction_month"] == 3


def test_predict_trend_empty_data():
    result = predict_trend([])
    assert "error" in result

