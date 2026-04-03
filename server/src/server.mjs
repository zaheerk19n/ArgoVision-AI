import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";
import dotenv from "dotenv";
import FormData from "form-data";
import fs from "fs";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "./models/User.js";
import auth from "./middleware/auth.mjs";

dotenv.config();

const app = express();

//-------------------- Enable CORS for frontend----------------------
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//---------------------🔗 MongoDB connection-------------------------
mongoose.connect("mongodb://127.0.0.1:27017/agrovision")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

//------------------Fix __dirname for ES modules----------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//--------------Multer config for image uploads-----------------------

const upload = multer({ dest: path.join(__dirname, "../uploads") });

//--------------------SIGN UP AND LOGIN ------------------------------


app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body || {};

    if (!name || !email || !password) {
      return res.status(400).send("All fields required");
    }

    // 🔍 Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send("User already exists");
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 💾 Save user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "User created successfully",
      userId: user._id
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
const JWT_SECRET = "supersecret"; // move to .env later

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    // 1️⃣ Check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 2️⃣ Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // 3️⃣ Create token
    const token = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 4️⃣ Send token
    res.json({
      message: "Login successful",
      token
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// --------------------------- TEST ROUTE -----------------------------
app.get("/", (req, res) => {
  res.send("Server is running");
});
app.get("/api/users", (req, res) => {
  res.send([
    {id:1,username:"zaheer",displayName:"Zaheer"},
    {id:2,username:"farzana",displayName:"Farzana"},
    {id:3,username:"browny",displayName:"Brownie"},
  ]);
});

app.get('/api/history',(req,res) => {
  res.send([
    {id:121,name:"zaheer"},
    {id:122,name:"farzana"},
    {id:123,name:"browny"},
  ])
})
//---------------------------Route Params-----------------------
app.get("/api/users/:id",(req, res) => {
  console.log(JSON.stringify(req.params));
  console.log({ ...req.params });
  console.log(req.params.id);


})





// ---------------- IMAGE UPLOAD & ML PREDICTION ----------------
app.post("/predict", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    // Prepare form data for FastAPI
    const formData = new FormData();
    formData.append(
      "file",
      fs.createReadStream(req.file.path)
    );

    // Send image to FastAPI ML server
    const mlResponse = await fetch("http://localhost:8000/predict", {
      method: "POST",
      body: formData,
      headers: formData.getHeaders(),
    });

    const prediction = await mlResponse.json();

    // Delete temp image after prediction
    fs.unlinkSync(req.file.path);

    res.json({
      success: true,
      disease: prediction.disease,
      confidence: prediction.confidence,
    });

  } catch (error) {
    console.error("ML Prediction Error:", error);
    res.status(500).json({ error: "Prediction failed" });
  }
});

// ---------------- LIST AVAILABLE MODELS ----------------
app.get("/models", async (req, res) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
    );
    const list = await response.json();
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch models" });
  }
});

// ---------------- GEMINI CHAT ----------------
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message required" });

    // ✅ Use a model that exists in your account (replace if needed)
    const modelId = "gemini-2.5-flash";

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: message }],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    console.log("Gemini raw response:", JSON.stringify(data, null, 2));

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      "Sorry, I couldn't respond.";

    res.json({ reply });
  } catch (err) {
    console.error("Gemini Error:", err);
    res.status(500).json({ error: "Gemini error" });
  }
});

// ---------------- START SERVER ----------------
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
  console.log("Gemini Key Loaded:", !!process.env.GEMINI_API_KEY);
});
