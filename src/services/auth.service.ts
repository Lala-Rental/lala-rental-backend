import { createUser, getUserByEmail } from "../models/user.model";
import dotenv from "dotenv";
import { getUserInfo } from "./googleauth.service";
import { IUser } from "../types/user.types";
import jwt, { SignOptions } from "jsonwebtoken";
import { Role } from "@prisma/client";
import { sendWelcomeEmail } from "./mail.service";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

/**
 * Handle Google OAuth
 *
 * @param token
 * @returns
 */
export const handleGoogleAuthService = async (token: string, role: Role) => {
  const googleUser = await getUserInfo(token);
  const { name, email, picture } = googleUser;
  let user = await getUserByEmail(email);

  if (!user) {
    user = await createUser({ name, avatar: picture, email, role: role });

    // Send welcome email
    await sendWelcomeEmail(email, name);
  }

  return user;
}

/**
 * Generate JWT token
 * 
 * @param user
 */
export const generateToken = async (user: IUser) => {
  const options: SignOptions = { expiresIn: "1h" };
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, options);
};
