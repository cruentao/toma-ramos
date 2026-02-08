const express = require('express');
const router = express.Router();
const seccionesController = require('../controllers/secciones.controller');

router.get('/:id', seccionesController.obtenerSeccionPorId);

router.get('/:id/horarios', seccionesController.obtenerHorariosSeccion);

router.post('/', seccionesController.crearSeccion);

module.exports = router;
