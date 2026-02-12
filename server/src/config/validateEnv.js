const validateEnv = () => {
  const required = ['MONGODB_URI', 'CLIENT_URL'];
  const missing = [];

  required.forEach(varName => {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  });

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  // Validate MONGODB_URI format
  if (!process.env.MONGODB_URI.startsWith('mongodb://') &&
      !process.env.MONGODB_URI.startsWith('mongodb+srv://')) {
    throw new Error('MONGODB_URI must be a valid MongoDB connection string');
  }

  console.log('Environment variables validated successfully');
};

module.exports = validateEnv;
