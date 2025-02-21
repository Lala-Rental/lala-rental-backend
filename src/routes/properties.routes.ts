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
 *     summary: Get all properties
 *     description: Retrieve all properties from the system.
 *     responses:
 *       200:
 *         description: Successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Successfully retrieved
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "12345"
 *                       title:
 *                         type: string
 *                         example: "Beautiful Apartment"
 *                       description:
 *                         type: string
 *                         example: "A beautiful apartment in the city center."
 *                       price:
 *                         type: number
 *                         example: 100
 *                       location:
 *                         type: string
 *                         example: "New York"
 *                       images:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["image1.jpg", "image2.jpg"]
 *                       hostId:
 *                         type: string
 *                         example: "54321"
 *       500:
 *         description: Server error
 */
router.get('/', PropertiesController.listProperties);

/**
 * @swagger
 * /properties/{id}/related:
 *   get:
 *     summary: Get all related properties to parsed ID
 *     description: Retrieve all related properties to parsed ID from the system.
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Successfully retrieved
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "12345"
 *                       title:
 *                         type: string
 *                         example: "Beautiful Apartment"
 *                       description:
 *                         type: string
 *                         example: "A beautiful apartment in the city center."
 *                       price:
 *                         type: number
 *                         example: 100
 *                       location:
 *                         type: string
 *                         example: "New York"
 *                       images:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["image1.jpg", "image2.jpg"]
 *                       hostId:
 *                         type: string
 *                         example: "54321"
 *       500:
 *         description: Server error
 */
router.get('/:id/related', PropertiesController.relatedProperties);

/**
 * @swagger
 * /properties/user/all:
 *   get:
 *     summary: Get all properties for user
 *     description: Retrieve all properties from the user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Successfully retrieved
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "12345"
 *                       title:
 *                         type: string
 *                         example: "Beautiful Apartment"
 *                       description:
 *                         type: string
 *                         example: "A beautiful apartment in the city center."
 *                       price:
 *                         type: number
 *                         example: 100
 *                       location:
 *                         type: string
 *                         example: "New York"
 *                       images:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["image1.jpg", "image2.jpg"]
 *                       hostId:
 *                         type: string
 *                         example: "54321"
 *       500:
 *         description: Server error
 */
router.get('/user/all', authMiddleware, PropertiesController.listUserProperties);

/**
 * @swagger
 * /properties/{id}:
 *   get:
 *     summary: Get property by ID
 *     description: Retrieve property by ID from the system.
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Successfully retrieved
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "12345"
 *                     title:
 *                       type: string
 *                       example: "Beautiful Apartment"
 *                     description:
 *                       type: string
 *                       example: "A beautiful apartment in the city center."
 *                     price:
 *                       type: number
 *                       example: 100
 *                     location:
 *                       type: string
 *                       example: "New York"
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["image1.jpg", "image2.jpg"]
 *                     hostId:
 *                       type: string
 *                       example: "54321"
 *       500:
 *         description: Server error
 */
router.get('/:id', PropertiesController.showProperty);

/**
 * @swagger
 * /properties:
 *   post:
 *     summary: Create a new property
 *     description: Create a new property in the system.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the property
 *                 example: "Beautiful Apartment"
 *               description:
 *                 type: string
 *                 description: Description of the property
 *                 example: "A beautiful apartment in the city center."
 *               price:
 *                 type: number
 *                 description: Price of the property
 *                 example: 100
 *               location:
 *                 type: string
 *                 description: Location of the property
 *                 example: "New York"
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Images of the property
 *                 example: ["image1.jpg", "image2.jpg"]
 *     responses:
 *       201:
 *         description: Successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Successfully created
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "12345"
 *                     title:
 *                       type: string
 *                       example: "Beautiful Apartment"
 *                     description:
 *                       type: string
 *                       example: "A beautiful apartment in the city center."
 *                     price:
 *                       type: number
 *                       example: 100
 *                     location:
 *                       type: string
 *                       example: "New York"
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["image1.jpg", "image2.jpg"]
 *                     hostId:
 *                       type: string
 *                       example: "54321"
 *       500:
 *         description: Server error
 */
router.post('/', authMiddleware, authorizeRoles([Role.HOST]), upload.array("images", 12), PropertiesController.storeProperty);

/**
 * @swagger
 * /properties/{id}:
 *   put:
 *     summary: Update property by ID
 *     description: Update property by ID from the system.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the property
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the property
 *                 example: "Beautiful Apartment"
 *               description:
 *                 type: string
 *                 description: Description of the property
 *                 example: "A beautiful apartment in the city center."
 *               price:
 *                 type: number
 *                 description: Price of the property
 *                 example: 100
 *               location:
 *                 type: string
 *                 description: Location of the property
 *                 example: "New York"
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Images of the property
 *                 example: ["image1.jpg", "image2.jpg"]
 *     responses:
 *       200:
 *         description: Successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Successfully updated
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "12345"
 *                     title:
 *                       type: string
 *                       example: "Beautiful Apartment"
 *                     description:
 *                       type: string
 *                       example: "A beautiful apartment in the city center."
 *                     price:
 *                       type: number
 *                       example: 100
 *                     location:
 *                       type: string
 *                       example: "New York"
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["image1.jpg", "image2.jpg"]
 *                     hostId:
 *                       type: string
 *                       example: "54321"
 *       500:
 *         description: Server error
 */
router.put('/:id', authMiddleware, authorizeRoles([Role.HOST]), upload.array("images", 12), PropertiesController.updateProperty);

/**
 * @swagger
 * /properties/{id}:
 *   delete:
 *     summary: Delete property by ID
 *     description: Delete property by ID from the system.
 *     security:
 *       - bearerAuth: []
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Successfully deleted
 *       500:
 *         description: Server error
 */
router.delete('/:id', authMiddleware, authorizeRoles([Role.HOST]), PropertiesController.deleteProperty);

export default router;