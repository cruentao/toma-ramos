const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('./auth.controller');
const authMiddleware = require('./auth.middleware');

// Rutas públicas
router.post('/register', register);
router.post('/login', login);

// Rutas protegidas
router.get('/profile', authMiddleware, getProfile);

module.exports = router;
