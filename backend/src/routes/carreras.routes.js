const express = require('express');
const router = express.Router();
const carrerasController = require('../controllers/carreras.controller');

// GET /api/carreras - Obtiene la carrera del usuario
router.get('/', carrerasController.obtenerCarrera);

// GET /api/carreras/malla - Obtiene la malla de la carrera del usuario
router.get('/malla', carrerasController.obtenerMallaCarrera);

module.exports = router;
