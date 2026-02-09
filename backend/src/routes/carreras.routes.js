const express = require('express');
const router = express.Router();
const carrerasController = require('../controllers/carreras.controller');

/**
 * @swagger
 * /api/carreras:
 *   get:
 *     summary: Obtiene todas las carreras disponibles
 *     tags: [Carreras]
 *     responses:
 *       200:
 *         description: Lista de carreras
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Carrera'
 *       500:
 *         description: Error del servidor
 */
router.get('/', carrerasController.obtenerCarreras);

/**
 * @swagger
 * /api/carreras/{id}:
 *   get:
 *     summary: Obtiene una carrera específica
 *     tags: [Carreras]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la carrera
 *     responses:
 *       200:
 *         description: Carrera encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Carrera'
 *       404:
 *         description: Carrera no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', carrerasController.obtenerCarreraPorId);

/**
 * @swagger
 * /api/carreras/{id}/malla:
 *   get:
 *     summary: Obtiene la malla curricular de una carrera
 *     tags: [Carreras]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la carrera
 *     responses:
 *       200:
 *         description: Malla curricular agrupada por semestre
 *         content:
 *           application/json:
 *             example:
 *               "1": 
 *                 - id: 1
 *                   nombre: "Programación Orientada a Objetos"
 *                 - id: 3
 *                   nombre: "Estructuras de Datos"
 *               "2":
 *                 - id: 2
 *                   nombre: "Bases de Datos"
 *       500:
 *         description: Error del servidor
 */
router.get('/:id/malla', carrerasController.obtenerMallaCarrera);

/**
 * @swagger
 * /api/carreras:
 *   post:
 *     summary: Crea una nueva carrera
 *     tags: [Carreras]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Ingeniería Civil en Informática"
 *     responses:
 *       201:
 *         description: Carrera creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Carrera'
 *       400:
 *         description: Nombre es requerido
 *       500:
 *         description: Error del servidor
 */
router.post('/', carrerasController.crearCarrera);

module.exports = router;