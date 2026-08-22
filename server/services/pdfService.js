const fs = require("fs");
const { PDFParse } = require("pdf-parse");

const extractTextFromPdf = async (filePath) => {
  const buffer = fs.readFileSync(filePath);

  const parser = new PDFParse({
    data: buffer
  });

  try {
    const result = await parser.getText();

    return result.text.trim();
  } finally {
    await parser.destroy();
  }
};

module.exports = {
  extractTextFromPdf
};