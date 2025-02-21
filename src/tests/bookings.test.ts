import request from 'supertest';
import express from 'express';
import bookingRoutes from '../routes/booking.routes';
import * as BookingsController from '../controllers/bookings.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const app = express();

app.use(express.json());
app.use('/bookings', bookingRoutes);

// Mock the middleware and controller functions
jest.mock('../middleware/auth.middleware');
jest.mock('../controllers/bookings.controller');

describe('Booking Routes', () => {
    beforeEach(() => jest.clearAllMocks());

    it('should get all bookings', async () => {
        (BookingsController.listBookings as jest.Mock).mockImplementation((_req, res) => {
            res.status(200).json({
                success: true,
                message: 'Successfully retrieved',
                data: [],
            });
        });

        const response = await request(app).get('/bookings');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            success: true,
            message: 'Successfully retrieved',
            data: [],
        });
    });   

    it('should get all bookings for a specific user', async () => {
        (BookingsController.listUserBookings as jest.Mock).mockImplementation((_req, res) => {
            res.status(200).json({
                success: true,
                message: 'Successfully retrieved',
                data: [],
            });
        });

        const response = await request(app).get('/bookings/user');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            success: true,
            message: 'Successfully retrieved',
            data: [],
        });
    });

    it('should get bookings by property ID', async () => {
        (BookingsController.getBookingsByPropertyId as jest.Mock).mockImplementation((_req, res) => {
            res.status(200).json({
                success: true,
                message: 'Successfully retrieved',
                data: [],
            });
        });

        const response = await request(app).get('/bookings/property/1');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            success: true,
            message: 'Successfully retrieved',
            data: [],
        });
    });

    it('should get a booking by ID', async () => {
        (BookingsController.showBooking as jest.Mock).mockImplementation((_req, res) => {
            res.status(200).json({
                success: true,
                message: 'Successfully retrieved',
                data: { id: '1', propertyId: '1', userId: '1' },
            });
        });

        const response = await request(app).get('/bookings/1');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            success: true,
            message: 'Successfully retrieved',
            data: { id: '1', propertyId: '1', userId: '1' },
        });
    });

    it('should create a new booking', async () => {
        (authMiddleware as jest.Mock).mockImplementation((_req, _res, next) => next());

        (BookingsController.storeBookings as jest.Mock).mockImplementation((_req, res) => {
            res.status(201).json({
                success: true,
                message: 'Successfully created',
                data: { id: '1', propertyId: '1', userId: '1' },
            });
        });

        const response = await request(app)
        .post('/bookings')
        .send({ propertyId: '1', userId: '1' });

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            success: true,
            message: 'Successfully created',
            data: { id: '1', propertyId: '1', userId: '1' },
        });
    });

    it('should update a booking by ID', async () => {
        (authMiddleware as jest.Mock).mockImplementation((_req, _res, next) => next());
        
        (BookingsController.updateBookings as jest.Mock).mockImplementation((_req, res) => {
            res.status(200).json({
                success: true,
                message: 'Successfully updated',
                data: { id: '1', propertyId: '1', userId: '1' },
            });
        });

        const response = await request(app)
        .put('/bookings/1')
        .send({ propertyId: '1', userId: '1' });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            success: true,
            message: 'Successfully updated',
            data: { id: '1', propertyId: '1', userId: '1' },
        });
    });

    it('should delete a booking by ID', async () => {
        (authMiddleware as jest.Mock).mockImplementation((_req, _res, next) => next());
        
        (BookingsController.deleteBooking as jest.Mock).mockImplementation((_req, res) => {
            res.status(200).json({
                success: true,
                message: 'Successfully deleted',
            });
        });

        const response = await request(app).delete('/bookings/1');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            success: true,
            message: 'Successfully deleted',
        });
    });
});