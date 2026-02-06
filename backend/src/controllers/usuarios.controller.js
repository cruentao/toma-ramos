const pool = require('../config/database');

const obtenerUsuarios = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT u.id, u.nombre, u.email, u.created_at,
             c.id as carrera_id, c.nombre as carrera_nombre
      FROM usuario u
      LEFT JOIN carrera c ON u.carrera_id = c.id
      ORDER BY u.id
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

const obtenerUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT u.id, u.nombre, u.email, u.created_at,
             c.id as carrera_id, c.nombre as carrera_nombre
      FROM usuario u
      LEFT JOIN carrera c ON u.carrera_id = c.id
      WHERE u.id = $1
    `, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
};

const crearUsuario = async (req, res) => {
  try {
    const { nombre, email, carrera_id } = req.body;
    
    if (!nombre || !email) {
      return res.status(400).json({ error: 'Nombre y email son requeridos' });
    }
    
    const result = await pool.query(
      'INSERT INTO usuario (nombre, email, carrera_id) VALUES ($1, $2, $3) RETURNING *',
      [nombre, email, carrera_id || null]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({ error: 'El email ya está registrado' });
    }
    console.error('Error al crear usuario:', error);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
};

module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario
};