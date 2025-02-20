import { Request, Response } from "express";
import { tryCatch } from "../utils/trycatch.util";
import dotenv from 'dotenv';
import { generateToken, handleGoogleAuthService } from "../services/auth.service";
import { CustomRequest } from '../types/request.types';
import { Role } from "@prisma/client";

dotenv.config();

/**
 * Handle Google OAuth
 *
 * @param req
 * @param res 
 * @returns 
 */
export const handleGoogleAuth = async (req: Request, res: Response) => {
  tryCatch(async () => {
    const { token, role } = req.body;

    if (![Role.HOST, Role.RENTER].includes(role)) {
      return res.status(400).json({
        status: "error",
        message: `Invalid role. Role must be either '${Role.HOST}' or '${Role.RENTER}'.`,
      });
    }

    const user = await handleGoogleAuthService(token, role);
    const authToken = await generateToken(user);

    res.status(200).json({
      status: "success",
      message: "User authenticated successfully",
      data: {
        user,
        access_token: authToken
      }
    });
  }, (error) => {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  });
}

/**
 * User Profile
 * 
 * @param req
 * @param res 
 * @returns 
 */
export const authProfile = (req: CustomRequest, res: Response) => {
  return tryCatch(async () => {
    res.status(200).json({
      status: "success",
      message: "User profile",
      data: req.user
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
