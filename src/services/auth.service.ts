import { createUser, getUserByEmail } from "../models/user.model";
import dotenv from "dotenv";
import { getUserInfo } from "./googleauth.service";
import { IUser } from "../types/user.types";
import jwt, { SignOptions } from "jsonwebtoken";
import { Role } from "@prisma/client";
import { sendWelcomeEmail } from "./mail.service";
import { createClient } from 'redis';
import { promisify } from 'util';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
const redisClient = createClient({});
const setAsync = promisify(redisClient.set).bind(redisClient);


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
  return jwt.sign({ id: user.id, email: user.email, role: user.role, name: user.name, avatar: user.avatar }, JWT_SECRET, options);
};

/**
 * Invalidate a JWT token by adding it to a blacklist.
 * 
 * @param {string} token - The JWT token to invalidate.
 * @returns {Promise<void>} - A promise that resolves to void.
 */
export const invalidateToken = async (token: string): Promise<void> => {
  const decoded: any = jwt.decode(token);
  const exp = decoded.exp;

  // Add the token to the blacklist with an expiration time
  await setAsync(token, 'blacklisted', 'EX', exp - Math.floor(Date.now() / 1000));
};
