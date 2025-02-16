import jwt, { SignOptions } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { createUser } from "../models/user.model";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { OAuth2Client } from "google-auth-library";
import { IUser } from "../types/user.types";

dotenv.config();

const prisma = new PrismaClient();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRATION = parseInt(process.env.JWT_EXPIRATION as string, 10);

export const generateToken = (user: IUser) => {
  const options: SignOptions = { expiresIn: JWT_EXPIRATION };
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, options);
};

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const verifyPassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};

/**
 * Handle Google OAuth
 * 
 * @param token 
 * @returns 
 */
export const handleGoogleAuthService = async (token: string) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  if (!payload) throw new Error("Invalid Google token");

  const { email, name, picture } = payload;

  let user = await prisma.user.findUnique({where: { email }});

  if (!user) {
    user = await createUser({ 
      name: name || "", 
      avatar: picture || "", 
      email: email || "", 
      role: "RENTER",
      verified: true 
    });
  }

  return user;
};
