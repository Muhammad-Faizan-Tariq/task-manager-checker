const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Priority Manager API',
      version: '1.0.0',
      description: 'REST API for managing tasks with priority-based sorting',
      contact: {
        name: 'API Support',
        email: 'support@taskmanager.com'
      }
    },
    servers: [
      {
        url: process.env.API_URL || 'http://localhost:5000',
        description: 'Development server'
      },
      {
        url: 'https://your-vercel-deployment.vercel.app',
        description: 'Production server'
      }
    ],
    components: {
      schemas: {
        Task: {
          type: 'object',
          required: ['title', 'dueDate'],
          properties: {
            _id: {
              type: 'string',
              description: 'Auto-generated task ID',
              example: '65f1234567890abcdef12345'
            },
            title: {
              type: 'string',
              description: 'Task title',
              maxLength: 100,
              example: 'Complete project documentation'
            },
            description: {
              type: 'string',
              description: 'Task description',
              maxLength: 500,
              example: 'Write comprehensive API documentation for all endpoints'
            },
            dueDate: {
              type: 'string',
              format: 'date-time',
              description: 'Task due date (cannot be in the past)',
              example: '2026-03-15T00:00:00.000Z'
            },
            priority: {
              type: 'string',
              enum: ['Low', 'Medium', 'High'],
              description: 'Task priority level',
              default: 'Medium',
              example: 'High'
            },
            isCompleted: {
              type: 'boolean',
              description: 'Task completion status',
              default: false,
              example: false
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Task creation timestamp'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Task last update timestamp'
            }
          }
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            data: {
              type: 'object'
            }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            message: {
              type: 'string',
              example: 'Error message'
            },
            errors: {
              type: 'array',
              items: {
                type: 'string'
              }
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js'] // Path to API routes for JSDoc comments
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
