# 🤖 AgroVision AI - Machine Learning Service (`ml-service`)

> The **AgroVision AI ML Service** is a Python-based microservice powered by **FastAPI** and **TensorFlow / Keras**. It serves state-of-the-art computer vision deep learning models for automated plant leaf disease diagnosis and confidence analysis.

---

## 🚀 Key Features

* **🌾 Automated Disease Classification**: Evaluates input plant leaf images to identify specific diseases and health conditions with confidence scoring.
* **⚡ High-Performance Inference API**: Lightweight FastAPI server running on Uvicorn, optimized for low-latency image inference.
* **🖼️ Automated Preprocessing Pipeline**: Converts, resizes (224x224 RGB), normalizes, and reshapes incoming image buffers for TensorFlow tensor input.
* **📊 Model Training & Experiments**: Includes Jupyter Notebooks and Python CLI scripts for dataset preprocessing, model fine-tuning, and metric evaluations.
* **📖 OpenAPI / Swagger Documentation**: Built-in interactive documentation and endpoint testing UI.

---

## 🛠 Tech Stack

* **Language**: Python 3.10+
* **Web Framework**: [FastAPI](https://fastapi.tiangolo.com/)
* **ASGI Server**: [Uvicorn](https://www.uvicorn.org/)
* **Deep Learning Framework**: [TensorFlow](https://www.tensorflow.org/) / Keras
* **Image Processing**: Pillow (PIL) & NumPy

---

## 📁 Project Structure

```text
ml-service/
├── app/
│   ├── main.py             # FastAPI entry point & prediction endpoint logic
│   └── requirements.txt    # Python dependencies for the REST API
├── models/
│   ├── class_names.json    # JSON mapping of model output indices to disease labels
│   ├── leaf_model.h5       # Production Keras CNN model weights
│   └── leaf_model_finetuned.h5 # Fine-tuned model checkpoint
├── notebooks/
│   ├── train_leaf_model.ipynb # Model training & architecture notebook
│   └── leaf_model_test.ipynb  # Accuracy evaluation notebook
├── scripts/
│   ├── preprocess_leaf_images.py # Dataset cleaning and resizing script
│   ├── predict.py          # Standalone CLI prediction script
│   └── train_leaf_model.py # CLI script for offline training
├── utils/
│   └── image_utils.py      # Reusable image transformation helpers
└── data/
    └── leaf_images/        # Training & validation image dataset directory
```

---

## ⚙️ Getting Started

### Prerequisites

* **Python**: `3.9` - `3.11` recommended
* **pip**: `v22.0` or higher

### Virtual Environment Setup

1. Navigate to the `ml-service` directory:
   ```bash
   cd ml-service
   ```

2. Create and activate a Python virtual environment:
   * **Windows (PowerShell)**:
     ```powershell
     python -m venv venv
     .\venv\Scripts\Activate.ps1
     ```
   * **Linux / macOS**:
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

3. Install required Python packages:
   ```bash
   pip install -r app/requirements.txt
   ```

---

## 🚀 Running the API Server

Start the FastAPI application with live reload enabled:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Once started, access:
* **API Server Health Check**: `http://localhost:8000/`
* **Interactive Swagger UI Docs**: `http://localhost:8000/docs`
* **ReDoc Documentation**: `http://localhost:8000/redoc`

---

## 📡 API Endpoints

### 1. Health Check
* **Method**: `GET`
* **Path**: `/`
* **Response**:
  ```json
  {
    "status": "ML Server Running"
  }
  ```

### 2. Disease Prediction
* **Method**: `POST`
* **Path**: `/predict`
* **Content-Type**: `multipart/form-data`
* **Parameters**:
  * `file`: Image file (e.g. `.jpg`, `.png`, `.jpeg`)
* **Response Example**:
  ```json
  {
    "disease": "Tomato___Bacterial_spot",
    "confidence": 98.45
  }
  ```

#### Example Usage with cURL:
```bash
curl -X POST "http://localhost:8000/predict" \
  -H "accept: application/json" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@/path/to/leaf_sample.jpg"
```

---

## 🧪 Model Training & Testing

To train or test the model using Jupyter Notebooks:

```bash
pip install jupyter
jupyter notebook notebooks/train_leaf_model.ipynb
```

Or run offline scripts:
```bash
python scripts/preprocess_leaf_images.py
```

---

## 📄 License

This service is part of the **AgroVision AI** project suite.
