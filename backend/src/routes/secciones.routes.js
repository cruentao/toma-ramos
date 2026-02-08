const express = require('express');
const router = express.Router();
const seccionesController = require('../controllers/secciones.controller');

// GET /api/secciones/:id
router.get('/:id', seccionesController.obtenerSeccionPorId);

// GET /api/secciones/:id/horarios
router.get('/:id/horarios', seccionesController.obtenerHorariosSeccion);

// POST /api/secciones
router.post('/', seccionesController.crearSeccion);

module.exports = router;
