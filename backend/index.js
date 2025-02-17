import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import qr from "qr-image";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static files from the frontend folder
app.use(express.static(path.join(__dirname, "../frontend")));

// POST endpoint to generate the QR code
app.post("/generate-qr", (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).send("URL is required");
  }

  try {
    const qrStream = qr.image(url, { type: "png" });

    res.setHeader("Content-Type", "image/png");
    qrStream.pipe(res);
  } catch (error) {
    console.error("Error generating QR code:", error);
    res.status(500).send("An error occurred while generating the QR code.");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
