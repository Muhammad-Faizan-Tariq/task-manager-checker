const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Mongoose options for stability and Vercel serverless
    const options = {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    await mongoose.connect(process.env.MONGODB_URI, options);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    // In serverless, don't exit process - just throw error
    throw error;
  }
};

module.exports = connectDB;
