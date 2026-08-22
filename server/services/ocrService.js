const { createWorker } = require("tesseract.js");

const extractTextFromImage = async (filePath) => {
  const worker = await createWorker("eng");

  try {
    const result = await worker.recognize(filePath);

    return result.data.text.trim();
  } finally {
    await worker.terminate();
  }
};

module.exports = {
  extractTextFromImage
};