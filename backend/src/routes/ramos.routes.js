const express = require('express');
const router = express.Router();
const ramosController = require('../controllers/ramos.controller');

router.get('/', ramosController.obtenerRamos);

router.get('/:id', ramosController.obtenerRamoPorId);

router.get('/:id/secciones', ramosController.obtenerSeccionesDelRamo);

router.post('/', ramosController.crearRamo);

module.exports = router;