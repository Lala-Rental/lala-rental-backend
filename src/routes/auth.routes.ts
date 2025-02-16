import express from "express";
import * as AuthController from "../controllers/auth.controller";

const router = express.Router();

// Google OAuth
router.post("/google", AuthController.handleGoogleAuth);
router.post("/logout", AuthController.logoutUser);

export default router;
