# How to Setup and Run

This project uses a **Node.js Gateway**, a **Flask Worker**, and **MongoDB**.

## 1. Prerequisites
- Install [Node.js](https://nodejs.org/)
- Install [Python](https://www.python.org/)
- A MongoDB database (Local or Atlas)

## 2. Environment Setup
Create a `.env` file in the root directory:
```env
MONGO_URI=your_mongodb_connection_string
```

## 3. Start Flask Worker (Port 5000)
The Flask service handles the database logic.
```bash
cd flask_crud
pip install flask flask-cors pymongo certifi python-dotenv
python app.py
```

## 4. Start Node.js Gateway (Port 3000)
The Node service acts as the front door.
```bash
cd node_api
# This installs express and cors from package.json
npm install
node server.js
```

## 5. Launch Frontend
Open `frontend/index.html` in your web browser.

---
**Note:** The system follows this flow:
`Browser` -> `Node.js (3000)` -> `Flask (5000)` -> `MongoDB`
