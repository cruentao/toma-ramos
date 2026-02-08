const pool = require('../config/database');

const obtenerRamos = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM ramo ORDER BY nombre');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener ramos:', error);
    res.status(500).json({ error: 'Error al obtener ramos' });
  }
};

const obtenerRamoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM ramo WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Ramo no encontrado' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener ramo:', error);
    res.status(500).json({ error: 'Error al obtener ramo' });
  }
};

const obtenerSeccionesDelRamo = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT s.id, s.cupos_totales, s.cupos_disponibles,
             p.id as profesor_id, p.nombre as profesor_nombre, p.email as profesor_email
      FROM seccion s
      JOIN profesor p ON s.profesor_id = p.id
      WHERE s.ramo_id = $1
    `, [id]);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener secciones:', error);
    res.status(500).json({ error: 'Error al obtener secciones' });
  }
};

const crearRamo = async (req, res) => {
  try {
    const { nombre } = req.body;
    
    if (!nombre) {
      return res.status(400).json({ error: 'El nombre es requerido' });
    }
    
    const result = await pool.query(
      'INSERT INTO ramo (nombre) VALUES ($1) RETURNING *',
      [nombre]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear ramo:', error);
    res.status(500).json({ error: 'Error al crear ramo' });
  }
};

module.exports = {
  obtenerRamos,
  obtenerRamoPorId,
  obtenerSeccionesDelRamo,
  crearRamo
};