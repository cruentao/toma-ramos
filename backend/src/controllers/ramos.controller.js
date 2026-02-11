const pool = require('../config/database');

// Obtiene solo los ramos de la carrera del usuario autenticado
const obtenerRamos = async (req, res) => {
  try {
    const carrera_id = req.user.carrera_id;

    const result = await pool.query(`
      SELECT r.id, r.nombre, mc.semestre
      FROM ramo r
      JOIN malla_carrera mc ON r.id = mc.ramo_id
      WHERE mc.carrera_id = $1
      ORDER BY mc.semestre, r.nombre
    `, [carrera_id]);

    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener ramos:', error);
    res.status(500).json({ error: 'Error al obtener ramos' });
  }
};

// Obtiene un ramo solo si pertenece a la carrera del usuario
const obtenerRamoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const carrera_id = req.user.carrera_id;

    const result = await pool.query(`
      SELECT r.id, r.nombre, mc.semestre
      FROM ramo r
      JOIN malla_carrera mc ON r.id = mc.ramo_id
      WHERE r.id = $1 AND mc.carrera_id = $2
    `, [id, carrera_id]);

    if (result.rows.length === 0) {
      return res.status(403).json({ error: 'No tienes acceso a este ramo' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener ramo:', error);
    res.status(500).json({ error: 'Error al obtener ramo' });
  }
};

// Obtiene secciones de un ramo solo si pertenece a la carrera del usuario
const obtenerSeccionesDelRamo = async (req, res) => {
  try {
    const { id } = req.params;
    const carrera_id = req.user.carrera_id;

    // Verificar que el ramo pertenece a la carrera del usuario
    const verificacion = await pool.query(
      'SELECT 1 FROM malla_carrera WHERE ramo_id = $1 AND carrera_id = $2',
      [id, carrera_id]
    );

    if (verificacion.rows.length === 0) {
      return res.status(403).json({ error: 'No tienes acceso a este ramo' });
    }

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
