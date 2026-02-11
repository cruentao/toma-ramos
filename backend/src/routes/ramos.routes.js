const express = require('express');
const router = express.Router();
const ramosController = require('../controllers/ramos.controller');

// Todas las rutas requieren autenticación (authMiddleware se aplica en server.js)

// GET /api/ramos - Obtiene ramos de la carrera del usuario
router.get('/', ramosController.obtenerRamos);

// GET /api/ramos/:id - Obtiene un ramo (solo si es de su carrera)
router.get('/:id', ramosController.obtenerRamoPorId);

// GET /api/ramos/:id/secciones - Secciones de un ramo (solo si es de su carrera)
router.get('/:id/secciones', ramosController.obtenerSeccionesDelRamo);

module.exports = router;
