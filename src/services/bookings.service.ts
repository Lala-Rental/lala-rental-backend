import { PrismaClient } from "@prisma/client";
import { IBooking } from "../types/booking.types";
import { createBooking, updateBooking } from "../models/booking.model";

const prisma = new PrismaClient();

/**
 * @description Check if there are any existing bookings for the selected dates
 * @param {string} propertyId - Property ID
 * @param {Date} checkIn - Check-in date
 * @param {Date} checkOut - Check-out date
 */
const anyExistingBookings = async (propertyId: string, checkIn: Date, checkOut: Date) => {
    const existingBookings = await prisma.booking.findMany({
        where: {
            propertyId: propertyId, 
            OR: [   
                {
                    checkIn: { lte: checkOut },
                    checkOut: { gte: checkIn },
                },
            ],
        },
    });

    return (existingBookings.length > 0) ? true : false;
}

/**
 * @description Handle booking
 * @param {Omit<IBooking, "id" | "createdAt" | "updatedAt">} validatedData - Validated booking data
 * @returns {Promise<IBooking>} - Created booking
 */
export const handleBooking = async (validatedData: Omit<IBooking, "id" | "createdAt" | "updatedAt">): Promise<IBooking> => {
    const { renterId, propertyId, checkIn, checkOut, status } = validatedData;
    const existingBookings = await anyExistingBookings(propertyId, checkIn, checkOut);

    if (existingBookings)
        throw new Error('Property is already booked for the selected dates');

    const booking = await createBooking(renterId, { propertyId, checkIn, checkOut, status });

    return booking;
}

/**
 * @description Handle booking updates
 * @param {Omit<IBooking, "createdAt" | "updatedAt">} validatedData - Validated booking data
 * @returns {Promise<IBooking>} - update booking
 */
export const handleUpdateBooking = async (validatedData: Omit<IBooking, "createdAt" | "updatedAt">): Promise<IBooking> => {
    const { id, renterId, propertyId, checkIn, checkOut, status } = validatedData;
    const existingBookings = await anyExistingBookings(propertyId, checkIn, checkOut);

    if (existingBookings)
        throw new Error('Property is already booked for the selected dates');

    const booking = await updateBooking(id, {
        propertyId, checkIn, checkOut, status, renterId
    });

    if (!booking) throw new Error('Booking Not found');

    return booking;
}
