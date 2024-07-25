import swaggerJsdoc from 'swagger-jsdoc';

const PORT = process.env.PORT;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task API',
      version: '1.0.0',
      description: 'Documentation For Task Manager API',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },                //.ts
  apis: ['src/controller/*', 'src/middleware/authentication.ts'], 
};

export const swaggerSpec = swaggerJsdoc(options);


