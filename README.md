# Social Media Content Analyzer

A full-stack web application that analyzes social media content from PDF and image files and provides engagement improvement suggestions.

## Features

- PDF file upload
- PNG, JPG, and JPEG image upload
- Drag-and-drop support
- PDF text extraction
- OCR using Tesseract
- Engagement score
- Word count
- Hashtag detection
- Emoji detection
- Call-to-action detection
- Improvement suggestions
- Loading states
- Error handling
- 10 MB file size validation
- Responsive UI

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