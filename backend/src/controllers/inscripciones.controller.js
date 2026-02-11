const pool = require('../config/database');

// Obtiene las inscripciones del usuario autenticado (no necesita parámetro)
const obtenerMisInscripciones = async (req, res) => {
  try {
    const usuario_id = req.user.id;

    const result = await pool.query(`
      SELECT i.id as inscripcion_id, i.created_at,
             s.id as seccion_id, s.cupos_totales, s.cupos_disponibles,
             r.id as ramo_id, r.nombre as ramo_nombre,
             p.nombre as profesor_nombre
      FROM inscripcion i
      JOIN seccion s ON i.seccion_id = s.id
      JOIN ramo r ON s.ramo_id = r.id
      JOIN profesor p ON s.profesor_id = p.id
      WHERE i.usuario_id = $1
      ORDER BY i.created_at DESC
    `, [usuario_id]);

    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener inscripciones:', error);
    res.status(500).json({ error: 'Error al obtener inscripciones' });
  }
};

// Crea una inscripción validando que el ramo pertenezca a la carrera del usuario
const crearInscripcion = async (req, res) => {
  const client = await pool.connect();

  try {
    const usuario_id = req.user.id;
    const carrera_id = req.user.carrera_id;
    const { seccion_id } = req.body;

    if (!seccion_id) {
      return res.status(400).json({ error: 'seccion_id es requerido' });
    }

    await client.query('BEGIN');

    // Verificar que la sección pertenece a un ramo de la carrera del usuario
    const verificacion = await client.query(`
      SELECT s.id, s.cupos_disponibles FROM seccion s
      JOIN malla_carrera mc ON s.ramo_id = mc.ramo_id
      WHERE s.id = $1 AND mc.carrera_id = $2
    `, [seccion_id, carrera_id]);

    if (verificacion.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(403).json({ error: 'No puedes inscribirte en secciones fuera de tu carrera' });
    }

    if (verificacion.rows[0].cupos_disponibles <= 0) {
      await client.query('ROLLBACK');
      return res.status(409).json({ error: 'No hay cupos disponibles' });
    }

    // Verificar que no esté inscrito en otra sección del mismo ramo
    const ramoCheck = await client.query(`
      SELECT i.id FROM inscripcion i
      JOIN seccion s1 ON i.seccion_id = s1.id
      JOIN seccion s2 ON s1.ramo_id = s2.ramo_id
      WHERE i.usuario_id = $1 AND s2.id = $2
    `, [usuario_id, seccion_id]);

    if (ramoCheck.rows.length > 0) {
      await client.query('ROLLBACK');
      return res.status(409).json({ error: 'Ya estás inscrito en otra sección de este ramo' });
    }

    // Crear inscripción
    const inscripcionResult = await client.query(
      'INSERT INTO inscripcion (usuario_id, seccion_id) VALUES ($1, $2) RETURNING *',
      [usuario_id, seccion_id]
    );

    // Actualizar cupos
    await client.query(
      'UPDATE seccion SET cupos_disponibles = cupos_disponibles - 1 WHERE id = $1',
      [seccion_id]
    );

    await client.query('COMMIT');
    res.status(201).json(inscripcionResult.rows[0]);
  } catch (error) {
    await client.query('ROLLBACK');

    if (error.code === '23505') {
      return res.status(409).json({ error: 'Ya estás inscrito en esta sección' });
    }

    console.error('Error al crear inscripción:', error);
    res.status(500).json({ error: 'Error al crear inscripción' });
  } finally {
    client.release();
  }
};

// Elimina una inscripción solo si pertenece al usuario autenticado
const eliminarInscripcion = async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    const usuario_id = req.user.id;

    await client.query('BEGIN');

    // Verificar que la inscripción pertenece al usuario
    const inscripcionResult = await client.query(
      'SELECT seccion_id FROM inscripcion WHERE id = $1 AND usuario_id = $2',
      [id, usuario_id]
    );

    if (inscripcionResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Inscripción no encontrada o no te pertenece' });
    }

    const seccion_id = inscripcionResult.rows[0].seccion_id;
    await client.query('DELETE FROM inscripcion WHERE id = $1', [id]);
    await client.query(
      'UPDATE seccion SET cupos_disponibles = cupos_disponibles + 1 WHERE id = $1',
      [seccion_id]
    );

    await client.query('COMMIT');
    res.json({ message: 'Inscripción eliminada exitosamente' });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error al eliminar inscripción:', error);
    res.status(500).json({ error: 'Error al eliminar inscripción' });
  } finally {
    client.release();
  }
};

module.exports = {
  obtenerMisInscripciones,
  crearInscripcion,
  eliminarInscripcion
};
