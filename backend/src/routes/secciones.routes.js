const express = require('express');
const router = express.Router();
const seccionesController = require('../controllers/secciones.controller');

/**
 * @swagger
 * /api/secciones/{id}:
 *   get:
 *     summary: Obtiene información detallada de una sección
 *     tags: [Secciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la sección
 *     responses:
 *       200:
 *         description: Sección encontrada con datos del ramo y profesor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 cupos_totales:
 *                   type: integer
 *                 cupos_disponibles:
 *                   type: integer
 *                 ramo_id:
 *                   type: integer
 *                 ramo_nombre:
 *                   type: string
 *                 profesor_id:
 *                   type: integer
 *                 profesor_nombre:
 *                   type: string
 *       404:
 *         description: Sección no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', seccionesController.obtenerSeccionPorId);

/**
 * @swagger
 * /api/secciones/{id}/horarios:
 *   get:
 *     summary: Obtiene los horarios de una sección
 *     tags: [Secciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la sección
 *     responses:
 *       200:
 *         description: Lista de horarios ordenados por día y hora
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   dia:
 *                     type: string
 *                     example: "Lunes"
 *                   hora_inicio:
 *                     type: string
 *                     example: "08:30"
 *                   hora_fin:
 *                     type: string
 *                     example: "10:00"
 *       500:
 *         description: Error del servidor
 */
router.get('/:id/horarios', seccionesController.obtenerHorariosSeccion);

/**
 * @swagger
 * /api/secciones:
 *   post:
 *     summary: Crea una nueva sección
 *     tags: [Secciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ramo_id
 *               - profesor_id
 *               - cupos_totales
 *             properties:
 *               ramo_id:
 *                 type: integer
 *                 example: 1
 *               profesor_id:
 *                 type: integer
 *                 example: 1
 *               cupos_totales:
 *                 type: integer
 *                 example: 30
 *     responses:
 *       201:
 *         description: Sección creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Seccion'
 *       400:
 *         description: Datos requeridos faltantes
 *       500:
 *         description: Error del servidor
 */
router.post('/', seccionesController.crearSeccion);

module.exports = router;