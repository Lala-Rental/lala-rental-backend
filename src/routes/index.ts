import express from "express";
import authRoutes from "./auth.routes";

const router = express.Router();

/**
 * Default route
 * @route GET /
 */
router.get("/", (req, res) => {
    res.send("Welcome to LaLa Rental API");
});

/**
 * Auth routes
 * @route /auth
 */
router.use("/auth", authRoutes);

export default router;
