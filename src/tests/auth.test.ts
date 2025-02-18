import request from 'supertest';
import express from 'express';
import authRoutes from '../routes/auth.routes';
import * as AuthController from '../controllers/auth.controller';

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);

jest.mock('dotenv', () => ({ config: jest.fn() }));
jest.mock('../controllers/auth.controller');

describe('Auth Routes', () => {
    beforeEach(() => jest.clearAllMocks());

    it('should authenticate user with Google key', async () => {
        (AuthController.handleGoogleAuth as jest.Mock).mockImplementation((_req, res) => {
            res.status(200).json({
                success: true,
                message: 'Successfully authenticated',
            });
        });

        const response = await request(app).post('/auth/google').send({ key: 'valid-google-key' });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            success: true,
            message: 'Successfully authenticated',
        });
    });

    it('should logout user', async () => {
        (AuthController.logoutUser as jest.Mock).mockImplementation((_req, res) => {
            res.status(200).json({
                success: true,
                message: 'Successfully logged out',
            });
        });

        const response = await request(app).post('/auth/logout');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            success: true,
            message: 'Successfully logged out',
        });
    });
});