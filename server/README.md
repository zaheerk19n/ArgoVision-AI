# ⚡ AgroVision AI - Express Backend Server (`server`)

> The **AgroVision AI Server** is a Node.js & Express REST API server that manages user authentication, stores crop disease diagnostic records in MongoDB, proxies leaf images to the Python FastAPI ML service, manages user crop fields, and powers the Gemini AI Advisor.

---

## 🚀 Key Features

* **🔒 User Authentication**: JWT token-based authentication with password hashing using `bcrypt`.
* **🌿 Leaf Image Proxy & Disease Diagnostics**: Connects with the `ml-service` (FastAPI) at `POST /predict`, parses prediction outputs, and saves diagnostic history to MongoDB.
* **📜 Prediction Scan History**: Stores user scan records and provides history queries (`GET /api/history`).
* **📊 Analytics Dashboard API**: Aggregates real-time farm stats (monitored plants, disease count, total AI predictions) for `GET /api/dashboard/stats`.
* **🌾 Managed User Crops (CRUD)**: Endpoints to list (`GET /api/crops`), create (`POST /api/crops`), and remove (`DELETE /api/crops/:id`) user fields.
* **🔔 Notification & Alerting System**: Automatically generates disease detection alerts and provides read state toggles (`GET /api/notifications`, `PUT /api/notifications/read-all`).
* **🤖 Google Gemini AI Advisor Chat**: Integrates with Google Generative AI (`POST /chat`) to provide context-aware agricultural advisory.

---

## 🛠 Tech Stack

* **Runtime**: [Node.js](https://nodejs.org/) (ES Modules)
* **Framework**: [Express.js v5](https://expressjs.com/)
* **Database**: [MongoDB](https://www.mongodb.com/) + [Mongoose ORM](https://mongoosejs.com/)
* **Authentication**: JSON Web Tokens (`jsonwebtoken`) & `bcrypt`
* **File Uploads**: `multer` & `form-data`
* **HTTP Client**: `node-fetch`

---

## 📁 Project Structure

```text
server/
├── uploads/                # Temporary image upload storage
├── src/
│   ├── middleware/
│   │   ├── auth.mjs        # JWT authentication middleware
│   │   └── role.mjs        # Role-based access control middleware
│   ├── models/
│   │   ├── User.js         # User account schema (name, email, password, role)
│   │   ├── Prediction.js   # Disease scan diagnostic record schema
│   │   ├── Crop.js         # User managed crop schema
│   │   └── Notification.js # Alert & update message schema
│   └── server.mjs          # Express app definition & route handlers
├── .env                    # Environment variables (PORT, MONGO_URI, JWT_SECRET, GEMINI_API_KEY)
└── package.json            # Server dependencies and launch scripts
```

---

## ⚙️ Getting Started

### Prerequisites

* **Node.js**: `v18.0.0` or higher
* **MongoDB**: Running locally at `mongodb://127.0.0.1:27017` or a MongoDB Atlas connection URI

### Installation

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in `.env`:
   ```env
   PORT=3000
   MONGO_URI=mongodb://127.0.0.1:27017/agrovision
   JWT_SECRET=mySuperSecretKey123
   JWT_EXPIRES=7d
   GEMINI_API_KEY=your_gemini_api_key_here
   ML_SERVICE_URL=http://localhost:8000/predict
   ```

### Running the Server

* **Development Mode** (with Nodemon hot reloading):
  ```bash
  npm run start:dev
  ```
* **Production Mode**:
  ```bash
  npm start
  ```

---

## 📡 Primary API Endpoints

### 🔐 Auth
* `POST /signup` - Register a new user
* `POST /login` - Authenticate & obtain JWT token
* `GET /api/me` - Fetch authenticated user profile

### 🌿 ML Inference & Scan History
* `POST /predict` - Upload image file for ML diagnosis & MongoDB persistence
* `GET /api/history` - Retrieve prediction history

### 📊 Dashboard & Catalog
* `GET /api/dashboard/stats` - Summary metrics (plants, diseases detected, total scans)
* `GET /api/diseases` - List plant disease library items

### 🌾 Crops & Notifications
* `GET /api/crops` | `POST /api/crops` | `DELETE /api/crops/:id` - Manage user crops
* `GET /api/notifications` | `PUT /api/notifications/read-all` - Manage user alerts

### 🤖 AI Advisor Chat
* `POST /chat` - Submit prompt to Gemini AI Advisor

---

## 📄 License

This service is part of the **AgroVision AI** project suite.
