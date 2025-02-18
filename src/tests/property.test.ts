import request from 'supertest';
import express from 'express';
import propertiesRoutes from '../routes/properties.routes';
import * as PropertiesController from '../controllers/properties.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { authorizeRoles } from '../middleware/authorize.middleware';

const app = express();

app.use(express.json());
app.use('/properties', propertiesRoutes);

// Mock the middleware and controller functions
jest.mock('../middleware/auth.middleware');
jest.mock('../middleware/authorize.middleware');
jest.mock('../controllers/properties.controller');

describe('Properties Routes', () => {
    beforeEach(() => jest.clearAllMocks());

    it('should get all properties', async () => {
        (PropertiesController.listProperties as jest.Mock).mockImplementation((_req, res) => {
            res.status(200).json({
                success: true,
                message: 'Successfully retrieved',
                data: [],
            });
        });

        const response = await request(app).get('/properties');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            success: true,
            message: 'Successfully retrieved',
            data: [],
        });
    });

    it('should get property by ID', async () => {
        (PropertiesController.showProperty as jest.Mock).mockImplementation((_req, res) => {
            res.status(200).json({
                success: true,
                message: 'Successfully retrieved',
                data: { id: '1', title: 'Test Property' },
            });
        });

        const response = await request(app).get('/properties/1');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            success: true,
            message: 'Successfully retrieved',
            data: { id: '1', title: 'Test Property' },
        });
    });

    it('should create a new property', async () => {
        (authMiddleware as jest.Mock).mockImplementation((_req, _res, next) => next());
        (authorizeRoles as jest.Mock).mockImplementation(() => (_req, _res, next) => next());
        (PropertiesController.storeProperty as jest.Mock).mockImplementation((_req, res) => {
            res.status(201).json({
                success: true,
                message: 'Successfully created',
                data: { id: '1', title: 'New Property' },
            });
        });

        const response = await request(app)
        .post('/properties')
        .send({ title: 'New Property' });

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            success: true,
            message: 'Successfully created',
            data: { id: '1', title: 'New Property' },
        });
    });

    it('should update a property by ID', async () => {
        (authMiddleware as jest.Mock).mockImplementation((_req, _res, next) => next());
        (authorizeRoles as jest.Mock).mockImplementation(() => (_req, _res, next) => next());

        (PropertiesController.updateProperty as jest.Mock).mockImplementation((_req, res) => {
            res.status(200).json({
                success: true,
                message: 'Successfully updated',
                data: { id: '1', title: 'Updated Property' },
            });
        });

        const response = await request(app).put('/properties/1').send({ title: 'Updated Property' });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            success: true,
            message: 'Successfully updated',
            data: { id: '1', title: 'Updated Property' },
        });
    });

    it('should delete a property by ID', async () => {
        (authMiddleware as jest.Mock).mockImplementation((_req, _res, next) => next());
        (authorizeRoles as jest.Mock).mockImplementation(() => (_req, _res, next) => next());
        
        (PropertiesController.deleteProperty as jest.Mock).mockImplementation((_req, res) => {
            res.status(200).json({
                success: true,
                message: 'Successfully deleted',
            });
        });

        const response = await request(app).delete('/properties/1');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            success: true,
            message: 'Successfully deleted',
        });
    });
});