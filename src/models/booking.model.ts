import { PrismaClient } from "@prisma/client";
import { IBooking } from "../types/booking.types";

const prisma = new PrismaClient();

/**
 * @description Create a new booking
 * @param {Omit<IBooking, "id" | "createdAt" | "updatedAt">} bookingData - Booking data
 * @returns {Promise<IBooking>} - Created booking
 */
export const createBooking = async (
  renterId: string,
  bookingData: Omit<IBooking, "id" | "createdAt" | "updatedAt" | "renterId">,
): Promise<IBooking> => {
  const booking = await prisma.booking.create({
    data: { renterId, ...bookingData },
  });

  return booking;
};

/**
 * @description Get Booking by ID
 * @param {string} id - Booking ID
 */
export const getBookingById = async (
  id: string,
  renterId?: string
): Promise<IBooking | null> => {
  const booking = await prisma.booking.findUnique({
    where: {
      id,
      ...(renterId && { renterId }),
    },
    include: { property: true, renter: true },
  });
  return booking;
};

/**
 * @description Get All bookings
 * @returns {Promise<IBooking[]>} - List of bookings
 */
export const getAllBookings = async (renterId?: string): Promise<IBooking[]> => {
  const bookings = await prisma.booking.findMany({ where: { renterId }, include: { property: true, renter: true }, });
  return bookings;
};

/**
 * @description Get all bookings for a specific user
 * @param {string} userId - User ID
 * @returns {Promise<IBooking[]>} - List of bookings
 */
export const getAllBookingsByUser = async (userId: string): Promise<IBooking[]> => {
  const bookings = await prisma.booking.findMany({
    where: { renterId: userId },
    include: { property: true, renter: true },
  });

  return bookings;
};

/**
 * @description Get bookings by property ID
 * @param {string} propertyId - Property ID
 * @returns {Promise<IBooking[]>} - List of bookings
 */
export const allBookingsByPropertyId = async (propertyId: string): Promise<IBooking[]> => {
    const bookings = await prisma.booking.findMany({
      where: { propertyId: propertyId},
      include: { property: true, renter: true },
    });
    return bookings;
};

/**
 * @description Update booking
 * @param {string} id - Booking ID
 * @param {Partial<IBooking>} bookingData - Booking data
 * @returns {Promise<IBooking>} - Updated booking
 */
export const updateBooking = async (
  id: string,
  bookingData: Partial<IBooking>
): Promise<IBooking> => {
  const booking = await prisma.booking.update({
    where: { id },
    data: bookingData,
  });
  return booking;
};

/**
 * @description Delete booking
 * @param {string} id - Booking ID
 * @returns {Promise<IBooking>} - Deleted booking
 */
export const deleteBooking = async (
  id: string,
  renterId?: string
): Promise<IBooking> => {
  const booking = await prisma.booking.delete({
    where: { id, ...(renterId && { renterId }) },
  });
  return booking;
};
