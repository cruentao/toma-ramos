const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller');

// GET /api/usuarios/perfil - Obtiene el perfil del usuario autenticado
router.get('/perfil', usuariosController.obtenerMiPerfil);

module.exports = router;
