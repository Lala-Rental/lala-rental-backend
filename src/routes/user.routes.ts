import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import * as UsersController from "../controllers/users.controller";
import { authorizeRoles } from "../middleware/authorize.middleware";
import { Role } from "@prisma/client";

const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users.
 *     description: Get all users from the system.
 *     responses:
 *       200:
 *         description: Successfully retrieved
 *       500:
 *         description: Server error
 */
router.get('/', authMiddleware, authorizeRoles([Role.ADMIN]), UsersController.listUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID.
 *     description: Get a user by ID.
 *     responses:
 *       200:
 *         description: Successfully retrieved
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 */
router.get('/:id', authMiddleware, authorizeRoles([Role.ADMIN]), UsersController.showUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID.
 *     description: Delete a user by ID.
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 */
router.delete('/:id', authMiddleware, authorizeRoles([Role.ADMIN]), UsersController.deleteUser);

export default router;