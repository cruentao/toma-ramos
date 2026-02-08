const pool = require('../config/database');

// Obtiene todas las inscripciones de un usuario
// Muestra ramos, profesores y cupos disponibles
const obtenerInscripcionesUsuario = async (req, res) => {
  try {
    const { usuarioId } = req.params;
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
    `, [usuarioId]);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener inscripciones:', error);
    res.status(500).json({ error: 'Error al obtener inscripciones' });
  }
};

// Crea una inscripción (tomar un ramo)
// Usa transacciones para garantizar consistencia
const crearInscripcion = async (req, res) => {
  // client se usa para manejar transacciones
  const client = await pool.connect();
  
  try {
    const { usuario_id, seccion_id } = req.body;
    
    if (!usuario_id || !seccion_id) {
      return res.status(400).json({ 
        error: 'usuario_id y seccion_id son requeridos' 
      });
    }
    
    // BEGIN inicia la transacción
    await client.query('BEGIN');
    
    // Verificar cupos disponibles
    const seccionResult = await client.query(
      'SELECT cupos_disponibles FROM seccion WHERE id = $1',
      [seccion_id]
    );
    
    if (seccionResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Sección no encontrada' });
    }
    
    if (seccionResult.rows[0].cupos_disponibles <= 0) {
      await client.query('ROLLBACK');
      return res.status(409).json({ error: 'No hay cupos disponibles' });
    }
    
    // Crear inscripción
    const inscripcionResult = await client.query(
      'INSERT INTO inscripcion (usuario_id, seccion_id) VALUES ($1, $2) RETURNING *',
      [usuario_id, seccion_id]
    );
    
    // Actualizar cupos (decrementar en 1)
    await client.query(
      'UPDATE seccion SET cupos_disponibles = cupos_disponibles - 1 WHERE id = $1',
      [seccion_id]
    );
    
    // COMMIT confirma todos los cambios
    await client.query('COMMIT');
    
    res.status(201).json(inscripcionResult.rows[0]);
  } catch (error) {
    // ROLLBACK deshace todos los cambios si algo falla
    await client.query('ROLLBACK');
    
    // 23505 = código de PostgreSQL para violación de UNIQUE constraint
    if (error.code === '23505') {
      return res.status(409).json({ error: 'Ya estás inscrito en esta sección' });
    }
    
    console.error('Error al crear inscripción:', error);
    res.status(500).json({ error: 'Error al crear inscripción' });
  } finally {
    // Siempre liberar la conexión
    client.release();
  }
};

// Elimina una inscripción (retirar un ramo)
// También usa transacciones para devolver el cupo
const eliminarInscripcion = async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { id } = req.params;
    await client.query('BEGIN');
    const inscripcionResult = await client.query(
      'SELECT seccion_id FROM inscripcion WHERE id = $1',
      [id]
    );
    
    if (inscripcionResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Inscripción no encontrada' });
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
  obtenerInscripcionesUsuario,
  crearInscripcion,
  eliminarInscripcion
};