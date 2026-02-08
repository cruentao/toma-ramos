const express = require('express');
const router = express.Router();
const inscripcionesController = require('../controllers/inscripciones.controller');

// GET /api/inscripciones/usuario/5 - Inscripciones del usuario con id=5
router.get('/usuario/:usuarioId', inscripcionesController.obtenerInscripcionesUsuario);

// POST /api/inscripciones - Crear inscripción
router.post('/', inscripcionesController.crearInscripcion);

// DELETE /api/inscripciones/10 - Eliminar inscripción con id=10
router.delete('/:id', inscripcionesController.eliminarInscripcion);

module.exports = router;