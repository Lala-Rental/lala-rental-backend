import { PrismaClient } from "@prisma/client";
import { IUser } from "../types/user.types";

const prisma = new PrismaClient();

/**
 * @description Create a new user
 * @param {Omit<IUser, "id" | "createdAt" | "updatedAt">} userData - User data
 * @returns {Promise<IUser>} - Created user
 */
export const createUser = async (userData: Omit<IUser, "id" | "createdAt" | "updatedAt">): Promise<IUser> => {
  const user = await prisma.user.create({
    data: { ...userData, verified: false },
  });
  
  return user;
};

/**
 * @description Get User by ID
 * @param {string} id - User ID
 */
export const getUserById = async (id: string): Promise<IUser | null> => {
  const user = await prisma.user.findUnique({ where: { id }});
  return user;
};

/**
 * @description Get All users
 * @returns {Promise<IUser[]>} - List of users
 */
export const getAllUsers = async (): Promise<IUser[]> => {
  const users = await prisma.user.findMany();
  return users;
};

/**
 * @description Update user
 * @param {string} id - User ID
 * @param {Partial<IUser>} userData - User data
 * @returns {Promise<IUser>} - Updated user
 */
export const updateUser = async (id: string, userData: Partial<IUser>): Promise<IUser> => {
  const user = await prisma.user.update({ where: { id }, data: userData,});
  return user;
};

/**
 * @description Delete user
 * @param {string} id - User ID
 * @returns {Promise<IUser>} - Deleted user
 */
export const deleteUser = async (id: string): Promise<IUser> => {
  const user = await prisma.user.delete({ where: { id } });
  return user;
};