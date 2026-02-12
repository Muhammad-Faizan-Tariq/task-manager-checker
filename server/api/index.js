require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('../src/config/database');
const taskRoutes = require('../src/routes/taskRoutes');
const validateEnv = require('../src/config/validateEnv');
const logger = require('../src/config/logger');
const swaggerSpec = require('../src/config/swagger');
const { httpLogger, errorLogger } = require('../src/middleware/httpLogger');
const { notFound, errorHandler } = require('../src/middleware/errorHandler');

// Validate environment variables
validateEnv();

const app = express();

// Middleware
app.use(express.json());

// HTTP request/response logging
app.use(httpLogger);
app.use(errorLogger);

// CORS configuration for Vercel
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      process.env.CLIENT_URL,
      'http://localhost:5173', // Vite dev server
      'http://localhost:4173'  // Vite preview
    ].filter(Boolean); // Remove undefined values

    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

// Database connection (cached in serverless)
const connectToDatabase = async () => {
  // Check mongoose connection state
  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  if (mongoose.connection.readyState === 1) {
    console.log('Using existing database connection');
    return mongoose.connection;
  }

  if (mongoose.connection.readyState === 2) {
    console.log('Database connection in progress, waiting...');
    // Wait for existing connection attempt to complete
    await new Promise((resolve) => {
      mongoose.connection.once('connected', resolve);
    });
    return mongoose.connection;
  }

  console.log('Creating new database connection');
  await connectDB();
  return mongoose.connection;
};

// Swagger documentation using CDN for Vercel compatibility
app.get('/api-docs', (req, res) => {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Task Manager API Docs</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui.min.css">
  <style>
    .swagger-ui .topbar { display: none }
  </style>
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui-bundle.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui-standalone-preset.min.js"></script>
  <script>
    window.onload = function() {
      window.ui = SwaggerUIBundle({
        url: '/api-docs.json',
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        plugins: [
          SwaggerUIBundle.plugins.DownloadUrl
        ],
        layout: "StandaloneLayout"
      });
    };
  </script>
</body>
</html>`;
  res.send(html);
});

// JSON spec endpoint
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

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

// Error handling (must be last)
app.use(notFound);
app.use(errorHandler);

// Initialize DB and export handler for Vercel
module.exports = async (req, res) => {
  try {
    await connectToDatabase();
    return app(req, res);
  } catch (error) {
    console.error('Serverless handler error:', error);

    // Respond with appropriate error based on error type
    if (error.name === 'MongooseServerSelectionError' || error.name === 'MongoServerError') {
      return res.status(503).json({
        success: false,
        message: 'Database connection failed',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Service temporarily unavailable'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'An unexpected error occurred'
    });
  }
};

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  connectToDatabase().then(() => {
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
      logger.info(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
    });
  });
}
