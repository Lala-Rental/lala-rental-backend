import express from "express";

import authRoutes from "./auth.routes";
import propertiesRoute from "./properties.routes";
import bookingsRoutes from "./booking.routes";
import usersRoutes from "./user.routes";

const router = express.Router();

/**
 * Default route
 * @route GET /
 */
router.get("/", (_req, res) => {
    res.send("Welcome to LaLa Rental API");
});

/**
 * Auth routes
 * @route /auth
 */
router.use("/auth", authRoutes);

/**
 * Properties routes
 * @route /properties 
 */
router.use('/properties', propertiesRoute);

/**
 * Bookings routes
 * @route /bookings
 */
router.use('/bookings', bookingsRoutes);

/**
 * User Routes
 * @route /users
 */
router.use('/users', usersRoutes);

export default router;