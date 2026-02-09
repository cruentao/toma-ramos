require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./config/database')
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const usuariosRoutes = require('./routes/usuarios.routes');
const carrerasRoutes = require('./routes/carreras.routes');
const ramosRoutes = require('./routes/ramos.routes');
const seccionesRoutes = require('./routes/secciones.routes');
const inscripcionesRoutes = require('./routes/inscripciones.routes');


app.use('/api/usuarios', usuariosRoutes);
app.use('/api/carreras', carrerasRoutes);
console.log(typeof ramosRoutes, ramosRoutes);
app.use('/api/ramos', ramosRoutes);
app.use('/api/secciones', seccionesRoutes);
app.use('/api/inscripciones', inscripcionesRoutes);

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend funcionando',
    timestamp: new Date().toISOString()
  });
});

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