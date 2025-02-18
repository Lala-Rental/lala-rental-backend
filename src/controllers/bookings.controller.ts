import { Request, Response } from 'express';
import { tryCatch } from '../utils/trycatch';
import { IUser } from '../types/user.types';
import { createBooking, getAllBookings, getBookingById, updateBooking as updateBookingModel, deleteBooking as deleteBookingModel } from '../models/booking.model';
import { bookingSchema } from '../validations/booking.validation';

interface CustomRequest extends Request {
    user: IUser;
}

/**
 * List all User Booking
 * 
 * @param req Request
 * @param res Response
 */
export const listBookings = async (req: CustomRequest, res: Response) => {
    return tryCatch(async () => {
        const user = req.user;
        
        if (!user)
            return res.status(401).json({ success: false, message: 'Unauthorized' });

        const bookings = await getAllBookings(user.id);
        return res.status(200).json(bookings);
    });
}

/**
 * Show Single Booking
 * 
 * @param req Request
 * @param res Response
 */
export const showBooking = async (req: CustomRequest, res: Response) => {
    return tryCatch(async () => {
        const { id } = req.params;
        const user = req.user;

        if (!user)
            return res.status(401).json({ success: false, message: 'Unauthorized' });

        const booking = await getBookingById(id, user.id);

        if (!booking)
            return res.status(404).json({ success: false, message: 'Booking not found' });

        return res.status(200).json({ success: true, booking });
    });
}

/**
 * Store Booking
 * 
 * @param req Request
 * @param res Response
 */
export const storeBookings = async (req: CustomRequest, res: Response) => {
    return tryCatch(async () => {
        const validatedData = bookingSchema.parse(req.body);
        const user = req.user;
        
        if (!user)
            return res.status(401).json({ success: false, message: 'Unauthorized' });

        const booking = await createBooking(user.id, {
            propertyId: validatedData.propertyId,
            checkIn: new Date(validatedData.checkIn),
            checkOut: new Date(validatedData.checkOut),
            status: 'PENDING'
        });

        return res.status(201).json({ success: true, booking });
    });
}

/**
 * Update Booking
 * 
 * @param req Request
 * @param res Response
 */
export const updateBookings = async (req: CustomRequest, res: Response) => {
    return tryCatch(async () => {
        const { id } = req.params;
        const validatedData = bookingSchema.parse(req.body);
        const user = req.user;

        if (!user)
            return res.status(401).json({ success: false, message: 'Unauthorized' });

        const booking = await updateBookingModel(id, {
            propertyId: validatedData.propertyId,
            checkIn: new Date(validatedData.checkIn),
            checkOut: new Date(validatedData.checkOut),
            status: validatedData.status,
            renterId: user.id
        });

        if (!booking)
            return res.status(404).json({ success: false, message: 'Booking not found' });

        return res.status(200).json({ success: true, booking });
    });
}

/**
 * Delete Booking
 * 
 * @param req Request
 * @param res Response
 */
export const deleteBooking = async (req: CustomRequest, res: Response) => {
    return tryCatch(async () => {
        const { id } = req.params;
        const user = req.user;

        if (!user)
            return res.status(401).json({ success: false, message: 'Unauthorized' });

        const booking = await deleteBookingModel(id, user.id);

        if (!booking)
            return res.status(404).json({ success: false, message: 'Booking not found' });

        return res.status(200).json({ success: true, message: 'Booking deleted successfully' });
    });
}