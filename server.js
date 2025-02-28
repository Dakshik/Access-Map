import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(__dirname));

// Routes
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

app.get('/map', (req, res) => {
  res.sendFile(join(__dirname, 'map.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(join(__dirname, 'about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(join(__dirname, 'contact.html'));
});

// Handle 404
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});