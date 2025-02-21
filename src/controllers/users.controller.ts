import { Request, Response } from 'express';
import { tryCatch } from '../utils/trycatch.util';
import { getAllUsers, getUserById, deleteUserById } from '../models/user.model';

/**
 * Handles the request to list all users.
 * 
 * This function is an Express.js route handler that retrieves all users from the database
 * and sends them back in the response. It uses a try-catch wrapper to handle any potential
 * errors that may occur during the database operation.
 * 
 * @param _req - The incoming request object (not used in this handler).
 * @param res - The response object used to send back the HTTP response.
 * @returns A JSON response containing a success message and the list of users.
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
 * Handles the request to show a user by their ID.
 * 
 * This function retrieves a user by their ID from the request parameters.
 * If the user is found, it responds with a 200 status and the user data.
 * If the user is not found, it responds with a 404 status and an error message.
 * 
 * @param req - The request object containing the user ID in the parameters.
 * @param res - The response object used to send the HTTP response.
 * @returns A promise that resolves to the HTTP response.
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
 * Deletes a user by their ID.
 *
 * This function handles the HTTP request to delete a user from the database.
 * It uses the `tryCatch` utility to handle any errors that may occur during the process.
 *
 * @param req - The HTTP request object, containing the user ID in the request parameters.
 * @param res - The HTTP response object, used to send the response back to the client.
 * @returns A promise that resolves to the HTTP response.
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