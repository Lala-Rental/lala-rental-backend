import request from 'supertest';
import express from 'express';
import userRoutes from '../routes/user.routes';
import * as UsersController from '../controllers/users.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { authorizeRoles } from '../middleware/authorize.middleware';

const app = express();

app.use(express.json());
app.use('/users', userRoutes);

// Mock the middleware and controller functions
jest.mock('../middleware/auth.middleware');
jest.mock('../middleware/authorize.middleware');
jest.mock('../controllers/users.controller');

describe('User Routes', () => {
    beforeEach(() => jest.clearAllMocks());

    it('should get all users', async () => {
        (UsersController.listUsers as jest.Mock).mockImplementation((_req, res) => {
            res.status(200).json({
                success: true,
                message: 'Successfully retrieved',
                data: [],
            });
        });

        const response = await request(app).get('/users');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            success: true,
            message: 'Successfully retrieved',
            data: [],
        });
    });

    it('should get a user by ID', async () => {
        (UsersController.showUser as jest.Mock).mockImplementation((_req, res) => {
            res.status(200).json({
                success: true,
                message: 'Successfully retrieved',
                data: { id: '1', name: 'Test User' },
            });
        });

        const response = await request(app).get('/users/1');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            success: true,
            message: 'Successfully retrieved',
            data: { id: '1', name: 'Test User' },
        });
    });

    it('should delete a user by ID', async () => {
        (authMiddleware as jest.Mock).mockImplementation((_req, _res, next) => next());
        (authorizeRoles as jest.Mock).mockImplementation(() => (_req, _res, next) => next());
        
        (UsersController.deleteUser as jest.Mock).mockImplementation((_req, res) => {
            res.status(200).json({
                success: true,
                message: 'Successfully deleted',
            });
        });

        const response = await request(app).delete('/users/1');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            success: true,
            message: 'Successfully deleted',
        });
    });
});