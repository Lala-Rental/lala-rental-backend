import { Request, Response } from 'express';
import { tryCatch } from '../utils/trycatch.util';
import { IUser } from '../types/user.types';
import { getAllBookings, getBookingById, deleteBooking as deleteBookingModel, getAllBookingsByUser, allBookingsByPropertyId } from '../models/booking.model';
import { bookingSchema } from '../validations/booking.validation';
import { handleBooking, handleUpdateBooking } from '../services/bookings.service';
import { ZodError } from 'zod';

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

        return res.status(200).json({
            data: bookings
        });
    });
}

/**
 * List all bookings for a specific user
 * 
 * @param req Request
 * @param res Response
 */
export const listUserBookings = async (req: CustomRequest, res: Response) => {
    return tryCatch(async () => {
        const bookings = await getAllBookingsByUser(req.user.id);
        
        return res.status(200).json({
            message: "User bookings fetched successfully",
            data: bookings
        });
    });
};

/**
 * Get bookings by property ID
 * 
 * @param req Request
 * @param res Response
 */
export const getBookingsByPropertyId = async (req: Request, res: Response) => {
    return tryCatch(async () => {
        const { propertyId } = req.params;
        const bookings = await allBookingsByPropertyId(propertyId);

        return res.status(200).json({
            message: "Bookings fetched successfully",
            data: bookings
        });
    });
};

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

        const booking = await handleBooking({
            renterId: user.id,
            propertyId: validatedData.propertyId,
            checkIn: new Date(validatedData.checkIn),
            checkOut: new Date(validatedData.checkOut),
            status: 'PENDING'
        });

        return res.status(201).json({ success: true, booking });
    }, (error) => {
        if (error instanceof ZodError) {
            return res.status(400).json({ success: false, message: 'Validation error', errors: error.errors });
        }

        return res.status(500).json({ message: error.message });
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

        const booking = await handleUpdateBooking({
            id: id,
            propertyId: validatedData.propertyId,
            checkIn: new Date(validatedData.checkIn),
            checkOut: new Date(validatedData.checkOut),
            status: validatedData.status,
            renterId: user.id
        });

        if (!booking)
            return res.status(404).json({ success: false, message: 'Booking not found' });

        return res.status(200).json({ success: true, booking });
    }, (error) => {
        return res.status(400).json({ success: false, message: error.message });
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