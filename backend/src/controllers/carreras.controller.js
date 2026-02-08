const pool = require('../config/database');

const obtenerCarreras = async (req, res) => {

  try {
    const result = await pool.query('SELECT * FROM carrera ORDER BY nombre');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener carreras:', error);
    res.status(500).json({ error: 'Error al obtener carreras' });
  }
};

const obtenerCarreraPorId = async (req, res) => {

  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM carrera WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Carrera no encontrada' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener carrera:', error);
    res.status(500).json({ error: 'Error al obtener carrera' });
  }
};

const obtenerMallaCarrera = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT mc.semestre, r.id as ramo_id, r.nombre as ramo_nombre
      FROM malla_carrera mc
      JOIN ramo r ON mc.ramo_id = r.id
      WHERE mc.carrera_id = $1
      ORDER BY mc.semestre, r.nombre
    `, [id]);
    
    const mallaPorSemestre = result.rows.reduce((acc, row) => {
 
      if (!acc[row.semestre]) {
        acc[row.semestre] = [];
      }
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

const crearCarrera = async (req, res) => {
  try {

    const { nombre } = req.body;

    if (!nombre) {
      return res.status(400).json({ error: 'El nombre es requerido' });
    }
    
    const result = await pool.query(
      'INSERT INTO carrera (nombre) VALUES ($1) RETURNING *',
      [nombre]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear carrera:', error);
    res.status(500).json({ error: 'Error al crear carrera' });
  }
};

module.exports = {
  obtenerCarreras,
  obtenerCarreraPorId,
  obtenerMallaCarrera,
  crearCarrera
};