require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./config/database');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Swagger (público)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas públicas (auth)
const authRoutes = require('./auth/auth.routes');
app.use('/api/auth', authRoutes);

// Middleware de autenticación
const authMiddleware = require('./auth/auth.middleware');

// Rutas protegidas (todas requieren token)
const usuariosRoutes = require('./routes/usuarios.routes');
const carrerasRoutes = require('./routes/carreras.routes');
const ramosRoutes = require('./routes/ramos.routes');
const seccionesRoutes = require('./routes/secciones.routes');
const inscripcionesRoutes = require('./routes/inscripciones.routes');

app.use('/api/usuarios', authMiddleware, usuariosRoutes);
app.use('/api/carreras', authMiddleware, carrerasRoutes);
app.use('/api/ramos', authMiddleware, ramosRoutes);
app.use('/api/secciones', authMiddleware, seccionesRoutes);
app.use('/api/inscripciones', authMiddleware, inscripcionesRoutes);

// Health check (público)
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend funcionando',
    timestamp: new Date().toISOString()
  });
});

// Test DB (público)
app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ 
      status: 'OK', 
      database: 'Conectado',
      time: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log('Servidor corriendo en http://localhost:' + PORT);
  console.log('Documentación disponible en http://localhost:' + PORT + '/api-docs');
});
