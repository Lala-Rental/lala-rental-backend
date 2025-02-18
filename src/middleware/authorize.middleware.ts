import { Response, NextFunction } from "express";
import { Role } from "@prisma/client";
import { CustomRequest } from "../types/request.types";

export const authorizeRoles = (roles: Role[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    const user = req.user; 

    if (!user || !roles.includes(user.role))
      res.status(403).json({ success: false, message: "You don't have right to this resources" });

    next();
  };
};