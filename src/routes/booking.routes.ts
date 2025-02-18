import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import * as BookingsController from "../controllers/bookings.controller";

const router = express.Router();

/**
 * @swagger
 * /bookings:
 *   get:
 *     summary: Get all bookings.
 *     description: Get all bookings from the system.
 *     responses:
 *       200:
 *         description: Successfully retrieved
 *       500:
 *         description: Server error
 */
router.get('/', authMiddleware, BookingsController.listBookings);

/**
 * @swagger
 * /bookings/user:
 *   get:
 *     summary: Get all bookings for a specific user.
 *     description: Get all bookings for a specific user from the system.
 *     responses:
 *       200:
 *         description: Successfully retrieved
 *       500:
 *         description: Server error
 */
router.get('/user', authMiddleware, BookingsController.listUserBookings);

/**
 * @swagger
 * /bookings/property/{propertyId}:
 *   get:
 *     summary: Get bookings by property ID.
 *     description: Get bookings by property ID.
 *     responses:
 *       200:
 *         description: Successfully retrieved
 *       404:
 *         description: Bookings not found
 *       500:
 *         description: Server error
 *     parameters:
 *       - in: path
 *         name: propertyId
 *         required: true
 *         description: ID of the property
 *         schema:
 *           type: string
 */
router.get('/property/:propertyId', authMiddleware, BookingsController.getBookingsByPropertyId);

/**
 * @swagger
 * /bookings/{id}:
 *   get:
 *     summary: Get a booking by ID.
 *     description: Get a booking by ID.
 *     responses:
 *       200:
 *         description: Successfully retrieved
 *       404:
 *         description: Booking not found
 *       500:
 *         description: server error
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 */
router.get('/:id', authMiddleware, BookingsController.showBooking);

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create a new booking.
 *     description: Create a new booking.
 *     responses:
 *       201:
 *         description: Successfully created
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post('/', authMiddleware, BookingsController.storeBookings);

/**
 * @swagger
 * /bookings/{id}:
 *   put:
 *     summary: Update a booking.
 *     description: Update a booking.
 *     responses:
 *       200:
 *         description: Successfully updated
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Server error
 */
router.put('/:id', authMiddleware, BookingsController.updateBookings);

/**
 * @swagger
 * /bookings/{id}:
 *   delete:
 *     summary: Delete a booking.
 *     description: Delete a booking.
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', authMiddleware, BookingsController.deleteBooking);

export default router;              