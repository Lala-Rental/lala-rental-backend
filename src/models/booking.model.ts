import { PrismaClient } from "@prisma/client";
import { IBooking } from "../types/booking.types";

const prisma = new PrismaClient();

/**
 * Creates a new booking in the database.
 *
 * @param renterId - The ID of the renter creating the booking.
 * @param bookingData - The data for the booking, excluding the fields "id", "createdAt", "updatedAt", and "renterId".
 * @returns A promise that resolves to the created booking.
 */
export const createBooking = async ( renterId: string, bookingData: Omit<IBooking, "id" | "createdAt" | "updatedAt" | "renterId">,): Promise<IBooking> => {
  const booking = await prisma.booking.create({
    data: { renterId, ...bookingData },
  });

  return booking;
};

/**
 * Retrieves a booking by its ID, optionally filtering by renter ID.
 *
 * @param id - The unique identifier of the booking.
 * @param renterId - (Optional) The unique identifier of the renter.
 * @returns A promise that resolves to the booking object if found, otherwise null.
 */
export const getBookingById = async (id: string, renterId?: string): Promise<IBooking | null> => {
  const booking = await prisma.booking.findUnique({
    where: { id, ...(renterId && { renterId }) },
    include: { property: true, renter: true },
  });
  
  return booking;
};

/**
 * Retrieves all bookings from the database, optionally filtered by renter ID.
 *
 * @param {string} [renterId] - The ID of the renter to filter bookings by. If not provided, all bookings will be retrieved.
 * @returns {Promise<IBooking[]>} - A promise that resolves to an array of booking objects.
 */
export const getAllBookings = async (renterId?: string): Promise<IBooking[]> => {
  const bookings = await prisma.booking.findMany({ where: { renterId }, include: { property: true, renter: true }, });
  return bookings;
};

/**
 * Retrieves all bookings associated with a specific user.
 *
 * @param userId - The unique identifier of the user whose bookings are to be retrieved.
 * @returns A promise that resolves to an array of bookings associated with the specified user.
 */
export const getAllBookingsByUser = async (userId: string): Promise<IBooking[]> => {
  const bookings = await prisma.booking.findMany({
    where: { renterId: userId },
    include: { property: true, renter: true },
  });

  return bookings;
};

/**
 * Retrieves all bookings associated with a specific property ID.
 *
 * @param {string} propertyId - The ID of the property for which to retrieve bookings.
 * @returns {Promise<IBooking[]>} A promise that resolves to an array of bookings.
 */
export const allBookingsByPropertyId = async (propertyId: string): Promise<IBooking[]> => {
  const bookings = await prisma.booking.findMany({
    where: { propertyId: propertyId},
    include: { property: true, renter: true },
  });

  return bookings;
};

/**
 * Updates an existing booking with the provided data.
 *
 * @param id - The unique identifier of the booking to update.
 * @param bookingData - An object containing the partial booking data to update.
 * @returns A promise that resolves to the updated booking object.
 */
export const updateBooking = async (id: string, bookingData: Partial<IBooking>): Promise<IBooking> => {
  const booking = await prisma.booking.update({
    where: { id },
    data: bookingData,
  });

  return booking;
};

/**
 * Deletes a booking from the database.
 *
 * @param id - The unique identifier of the booking to be deleted.
 * @param renterId - (Optional) The unique identifier of the renter associated with the booking.
 * @returns A promise that resolves to the deleted booking object.
 */
export const deleteBooking = async ( id: string, renterId?: string): Promise<IBooking> => {
  const booking = await prisma.booking.delete({
    where: { id, ...(renterId && { renterId }) },
  });

  return booking;
};
