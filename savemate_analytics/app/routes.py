from flask import Blueprint, request, jsonify
from .analytics import predict_trend

bp = Blueprint('analytics', __name__)

@bp.route("/predict", methods=["POST"])
def predict():
    data = request.json
    result = predict_trend(data)
    return jsonify(result)
