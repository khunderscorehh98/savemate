
# SaveMate – Personal Budgeting & AI-Powered Analytics Platform 💰📈

SaveMate is a full-stack financial management platform built by **Haziq Halidi**. It helps students and individuals manage their finances through features like transaction tracking, budget planning, goal setting, subscription management, and AI-driven financial forecasting.

This monorepo includes:

```
savemate/
├── api/                  # Node.js backend (Express + MongoDB)
├── app/                  # Vue.js web frontend (Vuetify)
├── savemate_analytics/   # Python Flask microservice for analytics
```

---

## 🧰 Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Frontend    | Vue.js 2, Vuetify, Axios            |
| Backend     | Node.js, Express, MongoDB Atlas     |
| AI Service  | Python, Flask, Scikit-Learn, Pandas |
| Auth        | JWT Token-based Authentication      |
| DevOps      | Docker (optional), Localhost APIs   |

---

## 🔐 Features Overview

### 🆓 Free Features:
- User Login / Register
- Dashboard Overview
- Transaction CRUD
- Budget & Goal Tracking
- Subscription Management

### 💎 Premium Features:
- Advanced Analytics 📊
- Spending Insights 🍩
- Financial Forecasting 📉
- Recurring Payments 🔁
- Custom Reports 📁
- Wallet Management 💼
- Goal Progress Tracker 🎯
- Smart Recommendations 💡

---

## 🚀 Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/khunderscorehh98/savemate.git
cd savemate
```

### 2. Start the Backend
```bash
cd api
npm install
cp .env.example .env
# Fill in MONGODB_URI and JWT_SECRET
npm start
```

### 3. Start the Vue.js Frontend
```bash
cd ../app/savemate_webapp
npm install
npm run serve
```

### 4. Start the Flutter Mobile App (optional)
```bash
cd ../app/savemate_app
flutter run
```
### 5. Start the Python Analytics API
```bash
cd ../savemate_analytics
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python analytics_service.py
```

Test endpoint with:
```bash
curl -X POST http://127.0.0.1:5000/predict \
-H "Content-Type: application/json" \
-d '[{"month": "2024-01", "amount": 500}, {"month": "2024-02", "amount": 600}]'
```

---

## 📡 Key APIs

### Node.js (Express)
| Endpoint                      | Method | Description              |
|-------------------------------|--------|--------------------------|
| `/api/auth/register`         | POST   | User registration        |
| `/api/auth/login`            | POST   | User login               |
| `/api/transactions`          | GET    | Fetch user transactions  |
| `/api/subscriptions`         | POST   | Create subscription plan |

### Python (Flask)
| Endpoint   | Method | Description             |
|------------|--------|-------------------------|
| `/predict` | POST   | Forecast next trend     |

---

## 🧪 Testing

### Unit Test for Forecast
```bash
cd savemate_analytics
pytest tests/test_forecast.py
```

---

## ✨ Credits

Developed by **Khairul Haziq Bin Haji Halidi**  
Powered by: VueJS, NodeJS, MongoDB, Python Flask, and Scikit-Learn.

---

## 📜 License
MIT License © 2025 Haziq Halidi
