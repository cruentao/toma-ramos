const pool = require('../config/database');

// Obtiene solo la carrera del usuario autenticado
const obtenerCarrera = async (req, res) => {
  try {
    const carrera_id = req.user.carrera_id;

    const result = await pool.query('SELECT * FROM carrera WHERE id = $1', [carrera_id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Carrera no encontrada' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener carrera:', error);
    res.status(500).json({ error: 'Error al obtener carrera' });
  }
};

// Obtiene la malla solo de la carrera del usuario autenticado
const obtenerMallaCarrera = async (req, res) => {
  try {
    const carrera_id = req.user.carrera_id;

    const result = await pool.query(`
      SELECT mc.semestre, r.id as ramo_id, r.nombre as ramo_nombre
      FROM malla_carrera mc
      JOIN ramo r ON mc.ramo_id = r.id
      WHERE mc.carrera_id = $1
      ORDER BY mc.semestre, r.nombre
    `, [carrera_id]);

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

module.exports = {
  obtenerCarrera,
  obtenerMallaCarrera
};
