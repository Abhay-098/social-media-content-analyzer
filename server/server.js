const { analyzeContent } = require("./services/analyzerService");
const { extractTextFromPdf } = require("./services/pdfService");
const { extractTextFromImage } = require("./services/ocrService");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Create uploads folder if it doesn't exist
const uploadPath = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Configure file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

    cb(null, uniqueName + path.extname(file.originalname));
  }
});

// Allowed file types
const allowedMimeTypes = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png"
];

// File validation
const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Unsupported file type. Please upload a PDF, PNG, JPG, or JPEG file."
      ),
      false
    );
  }
};

// Configure Multer
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024
  }
});

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Social Media Content Analyzer API is running"
  });
});

// Upload route
app.post("/api/analyze", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Please upload a file."
    });
  }

  try {
    let extractedText = "";

    if (req.file.mimetype === "application/pdf") {
      extractedText = await extractTextFromPdf(req.file.path);
    } else if (req.file.mimetype.startsWith("image/")) {
      extractedText = await extractTextFromImage(req.file.path);
    }

    if (!extractedText) {
      return res.status(400).json({
        success: false,
        message: "No readable text was detected in the file."
      });
    }

    const analysis = analyzeContent(extractedText);

    res.status(200).json({
    success: true,
    message: "File processed successfully.",
    file: {
        originalName: req.file.originalname,
        fileName: req.file.filename,
        mimeType: req.file.mimetype,
        size: req.file.size
    },
    extractedText,
    analysis
    });

  } catch (error) {
    console.error("Text extraction error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to extract text from the uploaded file."
    });
  }
});


// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File size must be less than 10 MB."
      });
    }

    return res.status(400).json({
      success: false,
      message: err.message
    });
  }

  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message || "Something went wrong."
    });
  }

  next();
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});