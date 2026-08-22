# Social Media Content Analyzer

> A full-stack application that extracts text from PDFs and images, analyzes social media content, and provides actionable engagement improvement suggestions.

## 🚀 Live Demo

**Live Application:**  
https://social-media-content-analyzer-taupe-five.vercel.app/

**Backend API:**  
https://social-media-content-analyzer-api-tdwi.onrender.com/

**GitHub Repository:**  
https://github.com/Abhay-098/social-media-content-analyzer

---

## ✨ Overview

Social Media Content Analyzer helps users understand and improve the engagement potential of their social media content.

Users can upload:

- PDF documents
- PNG images
- JPG/JPEG images
- Scanned documents

The application extracts the text, analyzes key engagement factors, calculates an engagement score, and provides practical suggestions for improvement.

---

## 🎯 Key Features

### Document Processing

- 📄 PDF text extraction
- 🖼️ Image upload support
- 🔎 OCR for scanned images using Tesseract.js
- 📥 Drag-and-drop uploads
- 📁 File picker support

### Content Analysis

- 📊 Engagement score out of 100
- 🔤 Word count
- #️⃣ Hashtag detection
- 😀 Emoji detection
- 📢 Call-to-action detection
- 💡 Improvement suggestions

### User Experience

- ⚡ Loading states during processing
- ❌ User-friendly error handling
- 📏 10 MB file-size validation
- 🛡️ File-type validation
- 📱 Responsive desktop/mobile interface
- 🔄 Analyze another document without refreshing

---

## 🛠️ Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React |
| Build Tool | Vite |
| Styling | CSS |
| Backend | Node.js + Express |
| File Uploads | Multer |
| PDF Processing | pdf-parse |
| OCR | Tesseract.js |
| API Communication | REST |
| Frontend Deployment | Vercel |
| Backend Deployment | Render |
| Source Control | Git + GitHub |

---

## 🏗️ Architecture

```text
                    ┌─────────────────────┐
                    │       User          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React / Vite UI   │
                    │                     │
                    │ File Upload         │
                    │ Validation          │
                    │ Results Dashboard   │
                    └──────────┬──────────┘
                               │
                         POST /api/analyze
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Express Backend   │
                    └──────────┬──────────┘
                               │
                  ┌────────────┴────────────┐
                  │                         │
                  ▼                         ▼
          ┌───────────────┐       ┌────────────────┐
          │   PDF Parser  │       │   Tesseract    │
          │   pdf-parse   │       │      OCR       │
          └───────┬───────┘       └───────┬────────┘
                  │                       │
                  └───────────┬───────────┘
                              ▼
                    ┌─────────────────────┐
                    │  Content Analyzer   │
                    │                     │
                    │ Word Count          │
                    │ Hashtags            │
                    │ Emojis              │
                    │ CTA Detection       │
                    │ Engagement Score     │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Suggestions + Data  │
                    └─────────────────────┘

📁 Project Structure

social-media-content-analyzer/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── services/
│   │   ├── analyzerService.js
│   │   ├── ocrService.js
│   │   └── pdfService.js
│   ├── server.js
│   ├── package.json
│   └── eng.traineddata
│
├── .gitignore
├── README.md
├── package.json
└── package-lock.json
