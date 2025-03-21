require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const helmet = require('helmet'); // For security headers

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET; // Use env variable

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));
app.use(helmet()); // Use Helmet to set security headers

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
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

// Register Route
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ message: "Server error. Registration failed." });
  }
});

// Signin Route
app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password!" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({
      message: "Signin successful!",
      token,
    });
  } catch (err) {
    console.error("Signin error:", err);
    res.status(500).json({ message: "Server error. Signin failed." });
  }
});

// Upload Route
app.post("/datasets/:id/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileDownloadUrl = `/uploads/${req.file.filename}`;

    const newFile = new DatasetFile({
      datasetId: req.params.id,
      fileName: req.file.filename,
      filePath: fileDownloadUrl,
    });

    await newFile.save();
    res.status(200).json({ message: "File uploaded successfully!", file: newFile });
  } catch (error) {
    res.status(500).json({ message: "Server error. Failed to upload file.", error: error.message });
  }
});

// Get Dataset
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
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
