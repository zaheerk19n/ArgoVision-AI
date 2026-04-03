from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import json

# =========================
# CONFIG
# =========================
MODEL_PATH = "models/leaf_model.h5"
CLASS_NAMES_PATH = "models/class_names.json"
IMG_SIZE = 224

# =========================
# LOAD MODEL
# =========================
model = tf.keras.models.load_model(MODEL_PATH)

with open(CLASS_NAMES_PATH, "r") as f:
    class_names = json.load(f)

# =========================
# FASTAPI APP
# =========================
app = FastAPI(title="Plant Disease Detection API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change to Express URL in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# HEALTH CHECK
# =========================
@app.get("/")
def health():
    return {"status": "ML Server Running"}

# =========================
# IMAGE PREPROCESS
# =========================
def preprocess_image(image_bytes):
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = img.resize((IMG_SIZE, IMG_SIZE))
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

# =========================
# PREDICT API
# =========================
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read()
    img_array = preprocess_image(image_bytes)

    predictions = model.predict(img_array)
    confidence = float(np.max(predictions))
    class_index = int(np.argmax(predictions))
    disease = class_names[class_index]

    return {
        "disease": disease,
        "confidence": round(confidence * 100, 2)
    }
