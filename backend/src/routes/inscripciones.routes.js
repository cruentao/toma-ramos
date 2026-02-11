const express = require('express');
const router = express.Router();
const inscripcionesController = require('../controllers/inscripciones.controller');

// GET /api/inscripciones - Obtiene inscripciones del usuario autenticado
router.get('/', inscripcionesController.obtenerMisInscripciones);

// POST /api/inscripciones - Crea inscripción (valida carrera)
router.post('/', inscripcionesController.crearInscripcion);

// DELETE /api/inscripciones/:id - Elimina inscripción (solo si es suya)
router.delete('/:id', inscripcionesController.eliminarInscripcion);

module.exports = router;
