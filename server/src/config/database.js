const mongoose = require('mongoose');
const logger = require('./logger');

const connectDB = async () => {
  try {
    // Mongoose options for stability and Vercel serverless
    const options = {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    await mongoose.connect(process.env.MONGODB_URI, options);
    logger.info('MongoDB connected successfully');
  } catch (error) {
    logger.error('MongoDB connection error:', { error: error.message, stack: error.stack });
    // In serverless, don't exit process - just throw error
    throw error;
  }
};

// Connection event listeners
mongoose.connection.on('connected', () => {
  logger.info('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  logger.error('Mongoose connection error:', { error: err.message });
});

mongoose.connection.on('disconnected', () => {
  logger.warn('Mongoose disconnected from MongoDB');
});

module.exports = connectDB;
