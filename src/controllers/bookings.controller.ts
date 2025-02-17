import { Request, Response } from 'express';
import { tryCatch } from '../utils/trycatch';
import { IUser } from '../types/user.types';

interface CustomRequest extends Request {
    user: IUser;
}

/**
 * List all properties
 * 
 * @param req Request
 * @param res Response
 */
export const listBookings = async (req: CustomRequest, res: Response) => {
    return tryCatch(async () => {

    });
}

export const showBooking = async (req: CustomRequest, res: Response) => {
    return tryCatch(async () => {
        
    });
}

export const storeBookings = async (req: CustomRequest, res: Response) => {
    return tryCatch(async () => {
        
    });
}

export const updateBookings = async (req: CustomRequest, res: Response) => {
    return tryCatch(async () => {
        
    });
}

export const deleteBooking = async (req: CustomRequest, res: Response) => {
    return tryCatch(async () => {
        
    });
}