import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import dotenv from 'dotenv';
import pdfjsLib from 'pdfjs-dist/legacy/build/pdf.js';
dotenv.config({ path: './.env' });
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log("API KEY:", process.env.GEMINI_API_KEY);
async function startServer() {
  const app = express();
  const PORT = 3000;

  console.log('🚀 Starting server initialization...');

  app.use(express.json());

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // ✅ Multer with memory storage (correct)
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit (safe)
  });

  // ✅ FIXED PARSE ROUTE
  app.post('/api/parse-resume', upload.single('resume'), async (req, res) => {
  try {
    console.log('📄 Received resume for parsing...');

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const data = new Uint8Array(req.file.buffer);

    const pdf = await pdfjsLib.getDocument({ data }).promise;

    let text = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();

      const strings = content.items.map((item: any) => item.str);
      text += strings.join(' ') + '\n';
    }

    console.log('✅ Extracted text length:', text.length);

    if (!text.trim()) {
      return res.status(400).json({
        error: 'No readable text found in PDF',
        details: 'This might be a scanned PDF.'
      });
    }

    res.json({ text });

  } catch (error) {
    console.error('❌ PDF parsing error:', error);

    res.status(500).json({
      error: 'Failed to parse PDF',
      details: error instanceof Error ? error.message : String(error)
    });
  }
});

  // Vite setup
  if (process.env.NODE_ENV !== 'production') {
    console.log('⚡ Configuring Vite middleware...');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false
      },
      appType: 'spa'
    });

    app.use(vite.middlewares);
    console.log('✅ Vite middleware ready');
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));

    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`🔥 Server running → http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('💥 CRITICAL: Server startup failed:', err);
  process.exit(1);
});