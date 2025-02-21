import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { tryCatch } from "../utils/trycatch.util";
import { IUser } from "../types/user.types";

dotenv.config();

const secret = process.env.JWT_SECRET ?? ("" as string);

/**
 * Middleware to authenticate requests using JWT tokens.
 * 
 * This middleware checks for the presence of a JWT token in the `Authorization` header of the request.
 * If the token is not present, it responds with a 401 status code and an error message.
 * 
 * If the token is present, it verifies the token using the secret key. If the token is expired or invalid,
 * it responds with appropriate error messages and status codes.
 * 
 * If the token is valid, it attaches the decoded user information to the request object and calls the `next` middleware.
 * 
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 */
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({
      status: "error",
      message: "Access denied. No token provided.",
    });
  }

  tryCatch(async () => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          res.status(401).json({
            status: "error",
            message: "Token expired.",
          });
        } else {
          res.status(400).json({
            status: "error",
            message: "Invalid token.",
          });
        }
      }

      (req as any).user = decoded as IUser;

      next();
    });
  }, (error) => {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  });
};
