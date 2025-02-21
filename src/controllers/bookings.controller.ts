import { Request, Response } from 'express';
import { tryCatch } from '../utils/trycatch.util';
import { getAllBookings, getBookingById, deleteBooking as deleteBookingModel, getAllBookingsByUser, allBookingsByPropertyId } from '../models/booking.model';
import { bookingSchema } from '../validations/booking.validation';
import { handleBooking, handleUpdateBooking } from '../services/bookings.service';
import { ZodError } from 'zod';
import { CustomRequest } from '../types/request.types';

/**
 * Lists all bookings for the authenticated user.
 *
 * @param {CustomRequest} req - The request object, containing user information.
 * @param {Response} res - The response object used to send the response.
 * @returns {Promise<void>} - A promise that resolves to void.
 *
 * @throws {401} If the user is not authenticated.
 * @throws {200} If the bookings are successfully retrieved.
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
 * List all bookings for a specific user.
 * 
 * This function handles the request to fetch all bookings associated with the authenticated user.
 * It uses the `tryCatch` utility to handle any potential errors during the process.
 * 
 * @param {CustomRequest} req - The request object, which includes the authenticated user's information.
 * @param {Response} res - The response object used to send back the HTTP response.
 * 
 * @returns {Promise<void>} - A promise that resolves to sending a JSON response with the user's bookings.
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
 * Retrieves all bookings for a specific property by its ID.
 * 
 * @param req - The request object containing the property ID in the route parameters.
 * @param res - The response object used to send the JSON response.
 * @returns A JSON response with a status of 200 and the list of bookings for the specified property.
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
 * Handles the request to show a booking by its ID.
 * 
 * This function retrieves a booking based on the provided ID in the request parameters.
 * 
 * @param req - The request object, containing the booking ID in the parameters and the user information.
 * @param res - The response object used to send the HTTP response.
 * @returns A promise that resolves to the HTTP response.
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
 * Handles the storage of bookings.
 * 
 * This function validates the request body against the booking schema,
 * checks if the user is authenticated, and then processes the booking.
 * If the booking is successful, it returns a 201 status with a success message
 * and the booking data.
 * 
 * @param req - The custom request object containing the booking data and user information.
 * @param res - The response object used to send the HTTP response.
 * @returns A promise that resolves to the HTTP response.
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

        return res.status(201).json({ success: true, message: "Booking Successfully sent!", data: booking });
    }, (error) => {
        if (error instanceof ZodError) {
            return res.status(400).json({ success: false, message: 'Validation error', errors: error.errors });
        }

        return res.status(500).json({ message: error.message });
    });
}

/**
 * Updates a booking with the provided data.
 * 
 * @param req - The request object containing the booking data and user information.
 * @param res - The response object used to send the response.
 * 
 * @returns A promise that resolves to a response indicating the success or failure of the update operation.
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
 * Deletes a booking based on the provided booking ID and user information.
 * 
 * @param {CustomRequest} req - The request object containing the booking ID in the params and user information.
 * @param {Response} res - The response object used to send back the appropriate HTTP response.
 * 
 * @returns {Promise<Response>} - A promise that resolves to the HTTP response indicating the result of the delete operation.
 * 
 * @throws {Error} - Throws an error if the booking deletion process fails.
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