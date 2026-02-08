const express = require('express');
const router = express.Router();
const inscripcionesController = require('../controllers/inscripciones.controller');

router.get('/usuario/:usuarioId', inscripcionesController.obtenerInscripcionesUsuario);

router.post('/', inscripcionesController.crearInscripcion);

router.delete('/:id', inscripcionesController.eliminarInscripcion);

module.exports = router;