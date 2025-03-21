require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = "your_jwt_secret";

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || "mongodb+srv://durga210804:Jahnavi333@cluster0.8c8bq.mongodb.net/userDB", {
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

// ✅ Register Route
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ message: "Server error. Registration failed." });
  }
});

// ✅ Signin Route
app.post("/signin", async (req, res) => {
  try {
    const { name, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    // Compare provided password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password!" });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

    // Send token in response
    res.status(200).json({
      message: "Signin successful!",
      token, // Send the token to frontend (you can store it in localStorage or cookies)
    });
  } catch (err) {
    console.error("Signin error:", err);
    res.status(500).json({ message: "Server error. Signin failed." });
  }
});

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
