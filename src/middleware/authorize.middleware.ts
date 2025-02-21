import { Response, NextFunction } from "express";
import { Role } from "@prisma/client";
import { CustomRequest } from "../types/request.types";

/**
 * Middleware to authorize user roles.
 * 
 * This middleware checks if the user's role is included in the specified roles.
 * If the user's role is not authorized, it responds with a 403 status and an error message.
 * Otherwise, it calls the next middleware function.
 * 
 * @param roles - An array of roles that are authorized to access the resource.
 * @returns A middleware function that checks the user's role.
 */
export const authorizeRoles = (roles: Role[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    const user = req.user; 

    if (!user || !roles.includes(user.role))
      res.status(403).json({ success: false, message: "You don't have right to this resources" });

    next();
  };
};