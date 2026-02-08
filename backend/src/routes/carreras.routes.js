const express = require('express');
const router = express.Router();
const carrerasController = require('../controllers/carreras.controller');

router.get('/', carrerasController.obtenerCarreras);
router.get('/:id', carrerasController.obtenerCarreraPorId);
router.get('/:id/malla', carrerasController.obtenerMallaCarrera);
router.post('/', carrerasController.crearCarrera);

module.exports = router;