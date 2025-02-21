import express from "express";
import { Role } from "@prisma/client";
import * as PropertiesController from "../controllers/properties.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { authorizeRoles } from "../middleware/authorize.middleware";
import { upload } from "../middleware/upload.middleware";

const router = express.Router();

/**
 * @swagger
 * /properties:
 *   get:
 *     summary: Get all properties.
 *     description: Get all properties from the system.
 *     responses:
 *       200:
 *         description: Successfully retrieved
 *       500:
 *         description: Server error
 */
router.get('/', PropertiesController.listProperties);
router.get('/:id/related', PropertiesController.relatedProperties);

/**
 * @swagger
 * /properties/{id}:
 *   get:
 *     summary: Get property by ID.
 *     description: Get property by ID from the system.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the property
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved
 *       500:
 *         description: Server error
 */
router.get('/:id', PropertiesController.showProperty);

/**
 * @swagger
 * /properties:
 *   post:
 *     summary: Create a new property.
 *     description: Create a new property in the system.
 *     responses:
 *       201:
 *         description: Successfully created
 *       500:
 *         description: Server error
 */
router.post('/', authMiddleware, authorizeRoles([Role.HOST]), upload.array("images", 12), PropertiesController.storeProperty);

/**
 * @swagger
 * /properties/{id}:
 *   put:
 *     summary: Update property by ID.
 *     description: Update property by ID from the system.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the property
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully updated
 *       500:
 *         description: Server error
 */
router.put('/:id', authMiddleware, authorizeRoles([Role.HOST]), upload.array("images", 12), PropertiesController.updateProperty);

/**
 * @swagger
 * /properties/{id}:
 *   delete:
 *     summary: Delete property by ID.
 *     description: Delete property by ID from the system.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the property
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       500:
 *         description: Server error
 */
router.delete('/:id', authMiddleware, authorizeRoles([Role.HOST]), PropertiesController.deleteProperty); 

export default router;