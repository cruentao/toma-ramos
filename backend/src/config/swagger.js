const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Toma de Ramos',
      version: '1.0.0',
      description: 'API REST para sistema de toma de ramos universitarios',
      contact: {
        name: 'Tu Nombre',
        email: 'tu.email@ejemplo.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desarrollo'
      }
    ],
    // Definir esquemas de respuesta comunes
    components: {
      schemas: {
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Mensaje de error'
            }
          }
        },
        Usuario: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            nombre: { type: 'string' },
            email: { type: 'string' },
            carrera_id: { type: 'integer' },
            created_at: { type: 'string', format: 'date-time' }
          }
        },
        Carrera: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            nombre: { type: 'string' }
          }
        },
        Ramo: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            nombre: { type: 'string' }
          }
        },
        Seccion: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ramo_id: { type: 'integer' },
            profesor_id: { type: 'integer' },
            cupos_totales: { type: 'integer' },
            cupos_disponibles: { type: 'integer' }
          }
        }
      }
    }
  },
  // Rutas donde buscar comentarios JSDoc
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;