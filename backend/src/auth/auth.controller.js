const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');

const SALT_ROUNDS = 10;

// ========================
// REGISTRO DE USUARIO
// ========================
const register = async (req, res) => {
  const { nombre, email, password, carrera_id } = req.body;

  // Validaciones básicas
  if (!nombre || !email || !password) {
    return res.status(400).json({ message: 'Nombre, email y password son obligatorios' });
  }

  try {
    // Verificar si el email ya existe
    const existingUser = await pool.query(
      'SELECT id FROM usuario WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ message: 'El email ya está registrado' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Insertar usuario
    const result = await pool.query(
      'INSERT INTO usuario (nombre, email, password, carrera_id) VALUES ($1, $2, $3, $4) RETURNING id, nombre, email, carrera_id, created_at',
      [nombre, email, hashedPassword, carrera_id || null]
    );

    const newUser = result.rows[0];

    // Generar token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, carrera_id: newUser.carrera_id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    return res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: newUser,
      token
    });
  } catch (error) {
    console.error('Error en registro:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// ========================
// LOGIN DE USUARIO
// ========================
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email y password son obligatorios' });
  }

  try {
    // Buscar usuario por email
    const result = await pool.query(
      'SELECT id, nombre, email, password, carrera_id FROM usuario WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const user = result.rows[0];

    // Comparar contraseña
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Generar token
    const token = jwt.sign(
      { id: user.id, email: user.email, carrera_id: user.carrera_id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    return res.status(200).json({
      message: 'Login exitoso',
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        carrera_id: user.carrera_id
      },
      token
    });
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// ========================
// OBTENER PERFIL (RUTA PROTEGIDA)
// ========================
const getProfile = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT u.id, u.nombre, u.email, u.carrera_id, c.nombre AS carrera_nombre, u.created_at FROM usuario u LEFT JOIN carrera c ON u.carrera_id = c.id WHERE u.id = $1',
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    return res.status(200).json({ user: result.rows[0] });
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = { register, login, getProfile };
