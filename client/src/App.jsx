import { useState } from "react";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const validateFile = (selectedFile) => {
    const allowedTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg"
    ];

    const maxSize = 10 * 1024 * 1024;

    if (!allowedTypes.includes(selectedFile.type)) {
      setError(
        "Unsupported file type. Please upload a PDF, PNG, JPG, or JPEG."
      );
      setFile(null);
      setResult(null);
      return false;
    }

    if (selectedFile.size > maxSize) {
      setError("File size must be less than 10 MB.");
      setFile(null);
      setResult(null);
      return false;
    }

    return true;
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      return;
    }

    if (!validateFile(selectedFile)) {
      return;
    }

    setFile(selectedFile);
    setResult(null);
    setError("");
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    const droppedFile = event.dataTransfer.files[0];

    if (!droppedFile) {
      return;
    }

    if (!validateFile(droppedFile)) {
      return;
    }

    setFile(droppedFile);
    setResult(null);
    setError("");
  };

  const handleAnalyze = async () => {
    console.log("Analyze button clicked");

    if (!file) {
      setError("Please select a file first.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "http://localhost:5000/api/analyze",
        {
          method: "POST",
          body: formData
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to analyze file."
        );
      }

      setResult(data);
    } catch (err) {
      setError(
        err.message ||
          "Something went wrong while analyzing the file."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
    setError("");
    setIsDragging(false);
  };

  return (
    <main className="app">
      <section className="container">
        <h1>Social Media Content Analyzer</h1>

        <p className="subtitle">
          Upload a PDF or image containing social media content
          and get actionable engagement improvement suggestions.
        </p>

        <div
          className={`upload-card ${
            isDragging ? "dragging" : ""
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="drop-zone">
            <div className="upload-icon">📄</div>

            <h2>Upload your content</h2>

            <p className="drop-text">
              Drag and drop your PDF or image here
            </p>

            <p className="or-text">or</p>

            <input
              id="file-upload"
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={handleFileChange}
            />

            <label
              htmlFor="file-upload"
              className="file-label"
            >
              Choose File
            </label>

            <small>
              PDF, PNG, JPG, JPEG • Maximum 10 MB
            </small>
          </div>

          {file && (
            <div className="selected-file">
              <span>Selected file:</span>
              <strong>{file.name}</strong>
            </div>
          )}

          <button
          type="button"
          className="analyze-button"
          onClick={handleAnalyze}
          disabled={!file || loading}
        >
          {loading ? "Analyzing..." : "Analyze Content"}
        </button>
        </div>

        {error && (
          <div className="error" role="alert">
            {error}
          </div>
        )}

        {loading && (
          <div className="loading">
            <div className="spinner"></div>

            <p>
              Extracting text and analyzing your content...
            </p>

            <small>
              This may take a few seconds for scanned images.
            </small>
          </div>
        )}

        {result && (
          <section className="results">
            <div className="results-header">
              <div>
                <h2>Analysis Results</h2>

                <p>
                  Here's how your content is performing.
                </p>
              </div>

              <button
              type="button"
              className="reset-button"
              onClick={handleReset}
            >
              Analyze Another
            </button>
            </div>

            <div className="score">
  <div>
    <span>Engagement Score</span>

    <p>
      Based on content structure and engagement factors
    </p>
  </div>

  <div className="score-value">
    <strong>
      {result.analysis.engagementScore}
      <small>/100</small>
    </strong>

    <div className="score-bar">
      <div
        className="score-fill"
        style={{
          width: `${result.analysis.engagementScore}%`
        }}
      ></div>
    </div>
  </div>
</div>

            <div className="metrics">
              <div className="metric">
                <strong>
                  {result.analysis.wordCount}
                </strong>
                <span>Words</span>
              </div>

              <div className="metric">
                <strong>
                  {result.analysis.hashtagCount}
                </strong>
                <span>Hashtags</span>
              </div>

              <div className="metric">
                <strong>
                  {result.analysis.emojiCount}
                </strong>
                <span>Emojis</span>
              </div>

              <div className="metric">
                <strong>
                  {result.analysis.hasCallToAction
                    ? "Yes"
                    : "No"}
                </strong>
                <span>Call to Action</span>
              </div>
            </div>

            <div className="result-section">
              <h3>Extracted Text</h3>

              <div className="text-box">
                {result.extractedText}
              </div>
            </div>

            <div className="result-section">
              <h3>Improvement Suggestions</h3>

              {result.analysis.suggestions.length > 0 ? (
                <ul className="suggestions">
                  {result.analysis.suggestions.map(
                    (suggestion, index) => (
                      <li key={index}>
                        {suggestion}
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <p>
                  Your content looks good. Keep experimenting
                  with different hooks and calls to action.
                </p>
              )}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}

export default App;