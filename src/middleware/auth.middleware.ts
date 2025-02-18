import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { tryCatch } from "../utils/trycatch.util";
import { IUser } from "../types/user.types";

dotenv.config();

const secret = process.env.JWT_SECRET ?? ("" as string);

/**
 * Middleware to check if the user is authenticated
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
