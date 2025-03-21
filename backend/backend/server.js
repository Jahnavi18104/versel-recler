require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || "your-mongo-uri", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model("User", userSchema);

// Dataset Schema
const datasetSchema = new mongoose.Schema({
  datasetId: String,
  fileName: String,
  filePath: String, // Stores the download URL
});
const DatasetFile = mongoose.model("DatasetFile", datasetSchema);

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});
const upload = multer({ storage });

// ✅ Upload Route
app.post("/datasets/:id/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileDownloadUrl = `/uploads/${req.file.filename}`; // Save relative path

    const newFile = new DatasetFile({
      datasetId: req.params.id,
      fileName: req.file.filename,
      filePath: fileDownloadUrl, // Stores "/uploads/filename"
    });

    await newFile.save();
    res.status(200).json({ message: "✅ File uploaded successfully!", file: newFile });
  } catch (error) {
    res.status(500).json({ message: "Server error. Failed to upload file.", error: error.message });
  }
});

// 📌 Check if Dataset Exists
app.get("/datasets/:id", async (req, res) => {
  try {
    const files = await DatasetFile.find({ datasetId: req.params.id });

    if (files.length > 0) {
      res.json({ exists: true, files });
    } else {
      res.json({ exists: false, files: [] });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching dataset", error: error.message });
  }
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
