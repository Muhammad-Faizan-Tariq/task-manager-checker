const morgan = require('morgan');
const logger = require('../config/logger');

// Custom token for response time coloring
morgan.token('status-colored', (req, res) => {
  const status = res.statusCode;
  const color = status >= 500 ? '\x1b[31m' // red
    : status >= 400 ? '\x1b[33m' // yellow
    : status >= 300 ? '\x1b[36m' // cyan
    : '\x1b[32m'; // green
  return `${color}${status}\x1b[0m`;
});

// Custom format for detailed logging
const detailedFormat = ':method :url :status-colored :response-time ms - :res[content-length]';

// Create morgan middleware
const httpLogger = morgan(detailedFormat, {
  stream: {
    write: (message) => logger.info(message.trim())
  }
});

// Detailed logger for errors
const errorLogger = morgan('combined', {
  skip: (req, res) => res.statusCode < 400,
  stream: {
    write: (message) => logger.error(message.trim())
  }
});

module.exports = { httpLogger, errorLogger };
