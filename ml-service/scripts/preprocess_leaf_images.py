import os
import numpy as np
from PIL import Image
from tqdm import tqdm

# ==============================
# CONFIG (FIXED FOR YOUR PATH)
# ==============================
DATASET_DIR = r"D:\CODE\MiniProject\ml-service\data\leaf_images\archive (6)\PlantVillage"
OUTPUT_DIR  = r"D:\CODE\MiniProject\ml-service\data\leaf_images\preprocessed"
IMG_SIZE = 224

os.makedirs(OUTPUT_DIR, exist_ok=True)

images = []
labels = []
class_names = []

print("📂 Reading dataset...")

for folder_name in sorted(os.listdir(DATASET_DIR)):
    folder_path = os.path.join(DATASET_DIR, folder_name)

    if not os.path.isdir(folder_path):
        continue

    class_index = len(class_names)
    class_names.append(folder_name)

    print(f"➡️ Processing: {folder_name}")

    for img_name in tqdm(os.listdir(folder_path)):
        img_path = os.path.join(folder_path, img_name)

        try:
            img = Image.open(img_path).convert("RGB")
            img = img.resize((IMG_SIZE, IMG_SIZE))
            img_array = np.array(img, dtype=np.float32) / 255.0

            images.append(img_array)
            labels.append(class_index)

        except Exception as e:
            print(f"❌ Skipped {img_path}")

# ==============================
# SAVE DATA
# ==============================
images = np.array(images)
labels = np.array(labels)

np.save(os.path.join(OUTPUT_DIR, "images.npy"), images)
np.save(os.path.join(OUTPUT_DIR, "labels.npy"), labels)
np.save(os.path.join(OUTPUT_DIR, "class_names.npy"), np.array(class_names))

print("\n✅ DONE!")
print("Images shape :", images.shape)
print("Labels shape :", labels.shape)
print("Classes      :", len(class_names))
