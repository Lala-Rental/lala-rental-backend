import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import * as BookingsController from "../controllers/bookings.controller";

const router = express.Router();

/**
 * @swagger
 * /bookings:
 *   get:
 *     summary: Get all bookings
 *     description: Retrieve all bookings from the system.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Successfully retrieved
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "12345"
 *                       propertyId:
 *                         type: string
 *                         example: "67890"
 *                       userId:
 *                         type: string
 *                         example: "54321"
 *                       checkIn:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-02-21T10:00:00Z"
 *                       checkOut:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-02-25T10:00:00Z"
 *                       status:
 *                         type: string
 *                         example: "confirmed"
 *       500:
 *         description: Server error
 */
router.get('/', authMiddleware, BookingsController.listBookings);

/**
 * @swagger
 * /bookings/user:
 *   get:
 *     summary: Get all bookings for a specific user
 *     description: Retrieve all bookings for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Successfully retrieved
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "12345"
 *                       propertyId:
 *                         type: string
 *                         example: "67890"
 *                       userId:
 *                         type: string
 *                         example: "54321"
 *                       checkIn:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-02-21T10:00:00Z"
 *                       checkOut:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-02-25T10:00:00Z"
 *                       status:
 *                         type: string
 *                         example: "confirmed"
 *       500:
 *         description: Server error
 */
router.get('/user', authMiddleware, BookingsController.listUserBookings);

/**
 * @swagger
 * /bookings/property/{propertyId}:
 *   get:
 *     summary: Get bookings by property ID
 *     description: Retrieve all bookings for a specific property.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: propertyId
 *         required: true
 *         description: ID of the property
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Successfully retrieved
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "12345"
 *                       propertyId:
 *                         type: string
 *                         example: "67890"
 *                       userId:
 *                         type: string
 *                         example: "54321"
 *                       checkIn:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-02-21T10:00:00Z"
 *                       checkOut:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-02-25T10:00:00Z"
 *                       status:
 *                         type: string
 *                         example: "confirmed"
 *       404:
 *         description: Bookings not found
 *       500:
 *         description: Server error
 */
router.get('/property/:propertyId', authMiddleware, BookingsController.getBookingsByPropertyId);

/**
 * @swagger
 * /bookings/{id}:
 *   get:
 *     summary: Get a booking by ID
 *     description: Retrieve a specific booking by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the booking
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved booking
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Successfully retrieved
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "12345"
 *                     propertyId:
 *                       type: string
 *                       example: "67890"
 *                     userId:
 *                       type: string
 *                       example: "54321"
 *                     checkIn:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-21T10:00:00Z"
 *                     checkOut:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-25T10:00:00Z"
 *                     status:
 *                       type: string
 *                       example: "confirmed"
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Server error
 */
router.get('/:id', authMiddleware, BookingsController.showBooking);

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create a new booking
 *     description: Create a new booking in the system.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               propertyId:
 *                 type: string
 *                 description: ID of the property
 *                 example: "67890"
 *               userId:
 *                 type: string
 *                 description: ID of the user
 *                 example: "54321"
 *               checkIn:
 *                 type: string
 *                 format: date-time
 *                 description: Check-in date and time
 *                 example: "2025-02-21T10:00:00Z"
 *               checkOut:
 *                 type: string
 *                 format: date-time
 *                 description: Check-out date and time
 *                 example: "2025-02-25T10:00:00Z"
 *               status:
 *                 type: string
 *                 description: Booking status
 *                 example: "confirmed"
 *     responses:
 *       201:
 *         description: Successfully created booking
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Successfully created
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "12345"
 *                     propertyId:
 *                       type: string
 *                       example: "67890"
 *                     userId:
 *                       type: string
 *                       example: "54321"
 *                     checkIn:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-21T10:00:00Z"
 *                     checkOut:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-25T10:00:00Z"
 *                     status:
 *                       type: string
 *                       example: "confirmed"
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
 *     summary: Update a booking
 *     description: Update an existing booking by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the booking
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               propertyId:
 *                 type: string
 *                 description: ID of the property
 *                 example: "67890"
 *               userId:
 *                 type: string
 *                 description: ID of the user
 *                 example: "54321"
 *               checkIn:
 *                 type: string
 *                 format: date-time
 *                 description: Check-in date and time
 *                 example: "2025-02-21T10:00:00Z"
 *               checkOut:
 *                 type: string
 *                 format: date-time
 *                 description: Check-out date and time
 *                 example: "2025-02-25T10:00:00Z"
 *               status:
 *                 type: string
 *                 description: Booking status
 *                 example: "confirmed"
 *     responses:
 *       200:
 *         description: Successfully updated booking
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Successfully updated
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "12345"
 *                     propertyId:
 *                       type: string
 *                       example: "67890"
 *                     userId:
 *                       type: string
 *                       example: "54321"
 *                     checkIn:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-21T10:00:00Z"
 *                     checkOut:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-25T10:00:00Z"
 *                     status:
 *                       type: string
 *                       example: "confirmed"
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
 *     summary: Delete a booking
 *     description: Delete a booking by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the booking
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted booking
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Successfully deleted
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', authMiddleware, BookingsController.deleteBooking);

export default router;