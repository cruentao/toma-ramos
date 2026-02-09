const express = require('express');
const router = express.Router();
const ramosController = require('../controllers/ramos.controller');

/**
 * @swagger
 * /api/ramos:
 *   get:
 *     summary: Obtiene todos los ramos disponibles
 *     tags: [Ramos]
 *     responses:
 *       200:
 *         description: Lista de ramos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ramo'
 *       500:
 *         description: Error del servidor
 */
router.get('/', ramosController.obtenerRamos);

/**
 * @swagger
 * /api/ramos/{id}:
 *   get:
 *     summary: Obtiene un ramo específico
 *     tags: [Ramos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del ramo
 *     responses:
 *       200:
 *         description: Ramo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ramo'
 *       404:
 *         description: Ramo no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', ramosController.obtenerRamoPorId);

/**
 * @swagger
 * /api/ramos/{id}/secciones:
 *   get:
 *     summary: Obtiene todas las secciones de un ramo
 *     tags: [Ramos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del ramo
 *     responses:
 *       200:
 *         description: Lista de secciones del ramo con información del profesor
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   cupos_totales:
 *                     type: integer
 *                   cupos_disponibles:
 *                     type: integer
 *                   profesor_id:
 *                     type: integer
 *                   profesor_nombre:
 *                     type: string
 *                   profesor_email:
 *                     type: string
 *       500:
 *         description: Error del servidor
 */
router.get('/:id/secciones', ramosController.obtenerSeccionesDelRamo);

/**
 * @swagger
 * /api/ramos:
 *   post:
 *     summary: Crea un nuevo ramo
 *     tags: [Ramos]
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
 *                 example: "Programación Orientada a Objetos"
 *     responses:
 *       201:
 *         description: Ramo creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ramo'
 *       400:
 *         description: Nombre es requerido
 *       500:
 *         description: Error del servidor
 */
router.post('/', ramosController.crearRamo);

module.exports = router;