import express from "express";
import * as AuthController from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

/**
 * @swagger
 * /auth/user:
 *   get:
 *     summary: Get authenticated user
 *     description: Retrieve the authenticated user's profile information.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved authenticated user profile
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
 *                   example: User profile
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "12345"
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *       500:
 *         description: Server error
 */
router.get('/user', authMiddleware, AuthController.authProfile)

/**
 * @swagger
 * /auth/google:
 *   post:
 *     summary: Authenticate user using Google key
 *     description: Authenticate user using a Google OAuth token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: Google OAuth token
 *                 example: "ya29.a0AfH6SM..."
 *               role:
 *                 type: string
 *                 description: User role, must be either 'HOST' or 'RENTER'
 *                 example: "HOST"
 *     responses:
 *       200:
 *         description: Successfully authenticated
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
 *                   example: User authenticated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "12345"
 *                         email:
 *                           type: string
 *                           example: "user@example.com"
 *                         name:
 *                           type: string
 *                           example: "John Doe"
 *                     access_token:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Invalid role
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Invalid role. Role must be either 'HOST' or 'RENTER'.
 *       500:
 *         description: Server error
 */
router.post("/google", AuthController.handleGoogleAuth);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     description: Logout the authenticated user from the system.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully logged out
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
 *                   example: User logged out successfully
 *       500:
 *         description: Server error
 */
router.post("/logout", AuthController.logoutUser);

export default router;
