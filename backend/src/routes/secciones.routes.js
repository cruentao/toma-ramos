const express = require('express');
const router = express.Router();
const seccionesController = require('../controllers/secciones.controller');

// GET /api/secciones/:id - Obtiene sección (solo si es de su carrera)
router.get('/:id', seccionesController.obtenerSeccionPorId);

// GET /api/secciones/:id/horarios - Horarios de sección (solo si es de su carrera)
router.get('/:id/horarios', seccionesController.obtenerHorariosSeccion);

module.exports = router;
