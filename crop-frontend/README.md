# 🌾 AgroVision AI - Frontend Client (`crop-frontend`)

> **AgroVision AI** is an intelligent, modern web application designed to empower farmers and agricultural enthusiasts with AI-powered plant leaf disease detection, dynamic disease libraries, farm analytics dashboards, and interactive AI advisory.

---

## 🚀 Key Features

* **🌿 AI Crop Disease Prediction**: Easily upload plant leaf images to receive immediate automated disease diagnostics along with confidence metrics.
* **🤖 Integrated AI Advisor & Chatbot**: Interactive embedded AI chatbot assistant (`Chatbot.jsx`) providing tailored agricultural advice and disease management guidance.
* **🔒 Authentication & Protected Routes**: JWT/token-backed authentication flow (`Signup.jsx`, `Login.jsx`, `ProtectedRoute.jsx`) safeguarding user dashboards and prediction history.
* **📊 Farm Dashboard & Analytics**: Interactive monitoring interface for tracking crop health, recent scans, and farm statistics.
* **📚 Comprehensive Disease Library**: Searchable database of plant diseases, symptoms, preventive measures, and treatments (`Diseases.jsx`).
* **📜 Prediction Scan History**: View, review, and track past diagnostic reports and crop health timeline (`History.jsx`).
* **🎨 Modern UI & Dynamic Theme Switcher**: Glassmorphism design aesthetics built with Tailwind CSS v4, smooth animations, dynamic dark/light mode toggle (`Togglebtn.jsx`), and fully responsive layouts.

---

## 🛠 Tech Stack

* **Core Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
* **Routing**: [React Router v7](https://reactrouter.com/)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + PostCSS + Custom CSS Variables
* **Icons**: [Lucide React](https://lucide.dev/) & [@heroicons/react](https://heroicons.com/)

---

## 📁 Project Structure

```text
crop-frontend/
├── public/                 # Static assets (logo, icons, illustrations)
├── src/
│   ├── assets/             # Images and local graphic assets
│   ├── components/         # Reusable UI components
│   │   ├── Chatbot.jsx     # AI Assistant interface
│   │   ├── Footer.jsx      # Application footer
│   │   ├── Front.jsx       # Hero landing banner
│   │   ├── Gallary.jsx     # Visual showcase gallery
│   │   ├── Headlines.jsx   # Live news ticker widget
│   │   ├── Login.jsx       # User login modal/form
│   │   ├── Navbar.jsx      # Navigation bar with mobile drawer
│   │   ├── ProtectedRoute.jsx # Auth guard wrapper
│   │   ├── Sidebar.jsx     # Dashboard navigation menu
│   │   ├── Togglebtn.jsx   # Theme mode toggle
│   │   └── UserDropdown.jsx# User profile menu
│   ├── data/               # Static datasets and sample records
│   ├── pages/              # Primary application views
│   │   ├── Dashboard.jsx   # Farm health metrics & summary
│   │   ├── Details.jsx     # Detailed view for specific crop/disease
│   │   ├── Diseases.jsx    # Disease library catalog
│   │   ├── History.jsx     # User prediction history
│   │   ├── Home.jsx        # Main landing page
│   │   ├── Notification.jsx# Alerts and updates panel
│   │   ├── Predict.jsx     # Leaf image upload & prediction launcher
│   │   ├── Signup.jsx      # Registration & Login page
│   │   └── UserCrop.jsx    # User crop management screen
│   ├── App.jsx             # Route definitions & top-level layout
│   ├── index.css           # Global theme variables & Tailwind imports
│   └── main.jsx            # Application entry point
├── eslint.config.js        # ESLint code quality configuration
├── index.html              # HTML shell
├── package.json            # Project dependencies and script definitions
└── vite.config.js          # Vite build system configuration
```

---

## ⚙️ Getting Started

### Prerequisites

* **Node.js**: `v18.0.0` or higher
* **npm**: `v9.0.0` or higher

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd crop-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running in Development Mode

Start the Vite dev server with Hot Module Replacement (HMR):
```bash
npm run dev
```
By default, the app will run at `http://localhost:5173`.

### Production Build & Preview

Build the optimized static assets for production:
```bash
npm run build
```

Locally preview the production build:
```bash
npm run preview
```

### Code Linting

Run ESLint to inspect code formatting and standard compliance:
```bash
npm run lint
```

---

## 🌐 API Configuration

The frontend interacts with the backend service at `http://localhost:3000` (or configured gateway):
* `POST /predict` - Uploads a plant leaf image multipart form file and retrieves prediction results (`disease` name, `confidence` score).

---

## 📄 License

This repository is part of the **AgroVision AI** project suite.
