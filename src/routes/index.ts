import express from "express";

import authRoutes from "./auth.routes";
import propertiesRoute from "./properties.routes";

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

export default router;
