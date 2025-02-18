import { Request, Response } from 'express';
import { tryCatch } from '../utils/trycatch.util';
import { getAllUsers, getUserById, deleteUserById } from '../models/user.model';

/**
 * Get all users
 * 
 * @param req Request
 * @param res Response
 */
export const listUsers = async (_req: Request, res: Response) => {
    return tryCatch(async () => {
        const users = await getAllUsers();

        return res.status(200).json({
            message: "Users fetched successfully",
            data: users
        });
    });
};

/**
 * Get a single user by ID
 * 
 * @param req Request
 * @param res Response
 */
export const showUser = async (req: Request, res: Response) => {
    return tryCatch(async () => {
        const { id } = req.params;
        const user = await getUserById(id);

        if (!user)
            return res.status(404).json({ success: false, message: 'User not found' });

        return res.status(200).json({ success: true, data: user });
    });
};

/**
 * Delete a user by ID
 * 
 * @param req Request
 * @param res Response
 */
export const deleteUser = async (req: Request, res: Response) => {
    return tryCatch(async () => {
        const { id } = req.params;
        const user = await deleteUserById(id);

        if (!user)
            return res.status(404).json({ success: false, message: 'User not found' });

        return res.status(200).json({ success: true, message: 'User deleted successfully' });
    });
};