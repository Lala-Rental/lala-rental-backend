import { Request, Response } from "express";
import { tryCatch } from "../utils/trycatch.util";
import dotenv from 'dotenv';
import { generateToken, handleGoogleAuthService, invalidateToken } from "../services/auth.service";
import { CustomRequest } from '../types/request.types';
import { Role } from "@prisma/client";

dotenv.config();

/**
 * Handles Google authentication for users.
 * 
 * This function processes the Google authentication token and assigns a role to the user.
 * It validates the role, authenticates the user, and generates an access token.
 * 
 * @param {Request} req - The request object containing the authentication token and user role.
 * @param {Response} res - The response object used to send the authentication status and data.
 * @returns {Promise<void>} - A promise that resolves to void.
 * @throws {Error} - Throws an error if the role is invalid or if authentication fails.
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
 * Retrieves the authenticated user's profile.
 * 
 * This function returns the profile information of the authenticated user.
 * It assumes that the user information is available in the request object.
 * 
 * @param {CustomRequest} req - The request object containing the authenticated user's information.
 * @param {Response} res - The response object used to send the profile data.
 * @returns {Promise<void>} - A promise that resolves to void.
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
 * Logs out the authenticated user.
 * 
 * This function destroys the user's session, effectively logging them out.
 * It handles any errors that may occur during the session destruction process.
 * 
 * @param {Request} req - The request object containing the user's session.
 * @param {Response} res - The response object used to send the logout status.
 * @returns {Promise<void>} - A promise that resolves to void.
 */
export const logoutUser = (req: Request, res: Response) => {
  return tryCatch(async () => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(400).json({
        status: "error",
        message: "No token provided",
      });
    }

    // Invalidate the token
    await invalidateToken(token);

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
