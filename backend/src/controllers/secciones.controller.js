const pool = require('../config/database');

// Obtiene una sección solo si el ramo pertenece a la carrera del usuario
const obtenerSeccionPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const carrera_id = req.user.carrera_id;

    const result = await pool.query(`
      SELECT s.id, s.cupos_totales, s.cupos_disponibles,
             r.id as ramo_id, r.nombre as ramo_nombre,
             p.id as profesor_id, p.nombre as profesor_nombre
      FROM seccion s
      JOIN ramo r ON s.ramo_id = r.id
      JOIN profesor p ON s.profesor_id = p.id
      JOIN malla_carrera mc ON r.id = mc.ramo_id AND mc.carrera_id = $2
      WHERE s.id = $1
    `, [id, carrera_id]);

    if (result.rows.length === 0) {
      return res.status(403).json({ error: 'No tienes acceso a esta sección' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener sección:', error);
    res.status(500).json({ error: 'Error al obtener sección' });
  }
};

// Obtiene horarios de una sección solo si el ramo pertenece a la carrera del usuario
const obtenerHorariosSeccion = async (req, res) => {
  try {
    const { id } = req.params;
    const carrera_id = req.user.carrera_id;

    // Verificar que la sección pertenece a un ramo de la carrera del usuario
    const verificacion = await pool.query(`
      SELECT 1 FROM seccion s
      JOIN malla_carrera mc ON s.ramo_id = mc.ramo_id
      WHERE s.id = $1 AND mc.carrera_id = $2
    `, [id, carrera_id]);

    if (verificacion.rows.length === 0) {
      return res.status(403).json({ error: 'No tienes acceso a esta sección' });
    }

    const result = await pool.query(`
      SELECT id, dia, hora_inicio, hora_fin
      FROM horario
      WHERE seccion_id = $1
      ORDER BY 
        CASE dia
          WHEN 'Lunes' THEN 1
          WHEN 'Martes' THEN 2
          WHEN 'Miércoles' THEN 3
          WHEN 'Jueves' THEN 4
          WHEN 'Viernes' THEN 5
          WHEN 'Sábado' THEN 6
        END,
        hora_inicio
    `, [id]);

    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener horarios:', error);
    res.status(500).json({ error: 'Error al obtener horarios' });
  }
};

const crearSeccion = async (req, res) => {
  try {
    const { ramo_id, profesor_id, cupos_totales } = req.body;

    if (!ramo_id || !profesor_id || !cupos_totales) {
      return res.status(400).json({ 
        error: 'ramo_id, profesor_id y cupos_totales son requeridos' 
      });
    }

    const result = await pool.query(
      `INSERT INTO seccion (ramo_id, profesor_id, cupos_totales, cupos_disponibles) 
       VALUES ($1, $2, $3, $3) RETURNING *`,
      [ramo_id, profesor_id, cupos_totales]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear sección:', error);
    res.status(500).json({ error: 'Error al crear sección' });
  }
};

module.exports = {
  obtenerSeccionPorId,
  obtenerHorariosSeccion,
  crearSeccion
};
