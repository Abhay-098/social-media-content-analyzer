# Social Media Content Analyzer

A full-stack web application that extracts text from PDF and image files and analyzes the content for social media engagement improvements.

## Live Application

**Frontend:**  
https://social-media-content-analyzer-taupe-five.vercel.app/

**Backend API:**  
https://social-media-content-analyzer-api-tdwi.onrender.com/

## GitHub Repository

https://github.com/Abhay-098/social-media-content-analyzer

---

## Features

- Upload PDF files
- Upload PNG, JPG, and JPEG images
- Drag-and-drop file upload
- File picker support
- PDF text extraction
- OCR for scanned images using Tesseract.js
- Word count analysis
- Hashtag detection
- Emoji detection
- Call-to-action detection
- Engagement score out of 100
- Actionable improvement suggestions
- Loading states
- Error handling
- File type validation
- 10 MB file size validation
- Responsive design for desktop and mobile

---

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- CSS

### Backend

- Node.js
- Express
- Multer
- pdf-parse
- Tesseract.js
- CORS
- dotenv

### Deployment

- Frontend: Vercel
- Backend: Render
- Source Code: GitHub

---

## Architecture

```text
User
 │
 ▼
React / Vite Frontend
 │
 │ POST /api/analyze
 ▼
Express API
 │
 ├── PDF → PDF Text Extraction
 │
 └── Image → Tesseract OCR
 │
 ▼
Content Analyzer
 │
 ├── Word Count
 ├── Hashtag Count
 ├── Emoji Count
 ├── CTA Detection
 └── Engagement Score
 │
 ▼
Improvement Suggestions
 │
 ▼
React Results Dashboard

## Project Structure

```text
social-media-content-analyzer/
├── client/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   └── package.json
│
├── server/
│   ├── services/
│   │   ├── pdfService.js
│   │   ├── ocrService.js
│   │   └── analyzerService.js
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
