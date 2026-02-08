const pool = require('../config/database');

// Obtiene todas las carreras de la BD
const obtenerCarreras = async (req, res) => {
  try {
    // SELECT simple ordenado alfabéticamente
    const result = await pool.query('SELECT * FROM carrera ORDER BY nombre');
    // Enviamos el array de carreras como respuesta JSON
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener carreras:', error);
    // Si algo falla, respondemos con código 500 (error del servidor)
    res.status(500).json({ error: 'Error al obtener carreras' });
  }
};

// Obtiene una carrera específica por su ID
const obtenerCarreraPorId = async (req, res) => {
  try {
    // req.params.id viene de la URL: /api/carreras/:id
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM carrera WHERE id = $1', [id]);
    
    // Si no encuentra la carrera, devolvemos 404 (no encontrado)
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Carrera no encontrada' });
    }
    
    // result.rows[0] porque solo esperamos un registro
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener carrera:', error);
    res.status(500).json({ error: 'Error al obtener carrera' });
  }
};

// Obtiene la malla curricular completa de una carrera
const obtenerMallaCarrera = async (req, res) => {
  try {
    const { id } = req.params;
    // JOIN para combinar malla_carrera con ramo y obtener nombres
    const result = await pool.query(`
      SELECT mc.semestre, r.id as ramo_id, r.nombre as ramo_nombre
      FROM malla_carrera mc
      JOIN ramo r ON mc.ramo_id = r.id
      WHERE mc.carrera_id = $1
      ORDER BY mc.semestre, r.nombre
    `, [id]);
    
    // Agrupamos los ramos por semestre para mejor estructura
    // reduce() transforma el array en un objeto: {1: [ramos], 2: [ramos], ...}
    const mallaPorSemestre = result.rows.reduce((acc, row) => {
      // Si el semestre no existe en el acumulador, lo creamos
      if (!acc[row.semestre]) {
        acc[row.semestre] = [];
      }
      // Agregamos el ramo al array del semestre correspondiente
      acc[row.semestre].push({
        id: row.ramo_id,
        nombre: row.ramo_nombre
      });
      return acc;
    }, {});
    
    res.json(mallaPorSemestre);
  } catch (error) {
    console.error('Error al obtener malla:', error);
    res.status(500).json({ error: 'Error al obtener malla curricular' });
  }
};

// Crea una nueva carrera
const crearCarrera = async (req, res) => {
  try {
    // req.body contiene el JSON enviado por el cliente
    const { nombre } = req.body;
    
    // Validación básica: verificamos que venga el nombre
    if (!nombre) {
      // 400 = Bad Request (petición incorrecta del cliente)
      return res.status(400).json({ error: 'El nombre es requerido' });
    }
    
    // RETURNING * hace que PostgreSQL devuelva el registro creado
    const result = await pool.query(
      'INSERT INTO carrera (nombre) VALUES ($1) RETURNING *',
      [nombre]
    );
    
    // 201 = Created (recurso creado exitosamente)
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear carrera:', error);
    res.status(500).json({ error: 'Error al crear carrera' });
  }
};

// Exportamos las funciones para usarlas en las rutas
module.exports = {
  obtenerCarreras,
  obtenerCarreraPorId,
  obtenerMallaCarrera,
  crearCarrera
};