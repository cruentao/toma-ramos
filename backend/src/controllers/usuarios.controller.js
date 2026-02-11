const pool = require('../config/database');

// Obtiene solo el perfil del usuario autenticado
const obtenerMiPerfil = async (req, res) => {
  try {
    const usuario_id = req.user.id;

    const result = await pool.query(`
      SELECT u.id, u.nombre, u.email, u.created_at,
             c.id as carrera_id, c.nombre as carrera_nombre
      FROM usuario u
      LEFT JOIN carrera c ON u.carrera_id = c.id
      WHERE u.id = $1
    `, [usuario_id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ error: 'Error al obtener perfil' });
  }
};

module.exports = {
  obtenerMiPerfil
};
