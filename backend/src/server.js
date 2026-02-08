require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./config/database')

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());


// Importar todas las rutas
const usuariosRoutes = require('./routes/usuarios.routes');
const carrerasRoutes = require('./routes/carreras.routes');
const ramosRoutes = require('./routes/ramos.routes');
const seccionesRoutes = require('./routes/secciones.routes');
const inscripcionesRoutes = require('./routes/inscripciones.routes');

console.log({
  usuarios: typeof usuariosRoutes,
  carreras: typeof carrerasRoutes,
  ramos: typeof ramosRoutes,
  secciones: typeof seccionesRoutes,
  inscripciones: typeof inscripcionesRoutes,
});


// Registrar todas las rutas
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
});