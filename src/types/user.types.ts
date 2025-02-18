import { Role } from "@prisma/client";

export interface IUser {
  id: string;
  name: string;
  avatar: string;
  email: string;
  role: Role;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}