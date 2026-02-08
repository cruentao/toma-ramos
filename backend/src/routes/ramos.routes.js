const express = require('express');
const router = express.Router();
const ramosController = require('../controllers/ramos.controller');

// GET /api/ramos - Lista todos los ramos
router.get('/', ramosController.obtenerRamos);

// GET /api/ramos/5 - Obtiene el ramo con id=5
router.get('/:id', ramosController.obtenerRamoPorId);

// GET /api/ramos/5/secciones - Obtiene todas las secciones del ramo 5
router.get('/:id/secciones', ramosController.obtenerSeccionesDelRamo);

// POST /api/ramos - Crea un nuevo ramo
router.post('/', ramosController.crearRamo);

module.exports = router;