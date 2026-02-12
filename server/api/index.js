require('dotenv').config();
const express = require('express');
const connectDB = require('../src/config/database');
const taskRoutes = require('../src/routes/taskRoutes');

const app = express();

// Middleware
app.use(express.json());

// CORS configuration for Vercel
app.use((req, res, next) => {
  const allowedOrigins = [
    process.env.CLIENT_URL,
    'http://localhost:5173', // Vite dev server
    'http://localhost:4173'  // Vite preview
  ];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
});

// Database connection (cached in serverless)
let cachedDb = null;
const connectToDatabase = async () => {
  if (cachedDb) {
    return cachedDb;
  }
  await connectDB();
  cachedDb = true;
  return cachedDb;
};

// API routes
app.use('/api', taskRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Task Priority Manager API' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Task Priority Manager API is running' });
});

// Initialize DB and export handler for Vercel
module.exports = async (req, res) => {
  await connectToDatabase();
  return app(req, res);
};

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  connectToDatabase().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
}
