import { Request, Response } from "express";
import { tryCatch } from "../utils/trycatch";
import dotenv from 'dotenv';
import { handleGoogleAuthService } from "../services/auth.service";

dotenv.config();

/**
 * Handle Google OAuth
 *
 * @param req
 * @param res 
 * @returns 
 */
export const handleGoogleAuth = async (req: Request, res: Response) => {
  return tryCatch(async () => {
    const { token } = req.body;
    const user = await handleGoogleAuthService(token);

    return res.status(200).json({
      status: "success",
      message: "User authenticated successfully",
      user,
    });
  });
}

/**
 * Logout user
 * 
 * @param req
 * @param res 
 * @returns 
 */
export const logoutUser = (req: Request, res: Response) => {
  return tryCatch(async () => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: "Unable to logout user",
        });
      }

      return res.status(200).json({
        status: "success",
        message: "User logged out successfully",
      });
    });
  });
}
