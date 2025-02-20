import express from "express";
import * as AuthController from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

/**
 * @swagger
 * /auth/user:
 *   post:
 *     summary: Get authenticated user
 *     description: Authenticate user using auth key.
 *     responses:
 *       200:
 *         description: Successfully authenticated
 *       500:
 *         description: Server error
 */
router.get('/user', authMiddleware, AuthController.authProfile)

/**
 * @swagger
 * /auth/google:
 *   post:
 *     summary: Post Google key to authenticate user.
 *     description: Authenticate user using Google key.
 *     responses:
 *       200:
 *         description: Successfully authenticated
 *       500:
 *         description: Server error
 */
router.post("/google", AuthController.handleGoogleAuth);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user.
 *     description: Logout user from the system.
 *     responses:
 *       200:
 *         description: Successfully logged out
 *       500:
 *         description: Server error
 */
router.post("/logout", AuthController.logoutUser);

export default router;
