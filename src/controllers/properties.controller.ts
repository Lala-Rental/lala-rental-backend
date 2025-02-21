import { Request, Response } from 'express';
import { tryCatch } from '../utils/trycatch.util';
import { createProperty, getAllProperties, getPropertyById, updateProperty as updatePropertyModel, deleteProperty as deletePropertyModel, getRelatedProperties } from '../models/property.model';
import { propertySchema } from '../validations/property.validation';
import { uploadImages } from '../services/properties.service';
import { ZodError } from 'zod';
import { CustomRequest } from '../types/request.types';

/**
 * Controller function to list all properties.
 * 
 * This function handles the HTTP request to fetch all properties from the database.
 * It uses the `tryCatch` utility to handle any potential errors during the process.
 * 
 * @param _req - The HTTP request object (not used in this function).
 * @param res - The HTTP response object used to send the response.
 * @returns A JSON response with a status code of 200 and the list of properties.
 */
export const listProperties = async (_req: Request, res: Response) => {
    return tryCatch(async () => {
        const properties = await getAllProperties();
        return res.status(200).json({
            message: "Properties fetched successfully",
            data: properties
        });
    });
}

/**
 * List all properties associated with the authenticated user.
 *
 * This function handles the request to fetch all properties for the user
 * identified by the `id` in the `req.user` object. It uses the `tryCatch`
 * utility to handle any potential errors during the asynchronous operation.
 *
 * @param {CustomRequest} req - The request object, which includes the authenticated user's information.
 * @param {Response} res - The response object used to send back the HTTP response.
 * @returns {Promise<void>} A promise that resolves to sending a JSON response with the properties data.
 */
export const listUserProperties = async (req: CustomRequest, res: Response) => {
    return tryCatch(async () => {
        const properties = await getAllProperties(req.user.id);

        return res.status(200).json({
            message: "Properties fetched successfully",
            data: properties
        });
    });
}

/**
 * Controller function to fetch related properties based on the provided property ID.
 * 
 * This function uses the `tryCatch` utility to handle errors and sends a JSON response
 * with the related properties if successful.
 * 
 * @param req - The request object, containing the property ID in the parameters.
 * @param res - The response object, used to send the JSON response.
 * @returns A promise that resolves to a JSON response with the related properties.
 */
export const relatedProperties = async (req: Request, res: Response) => {
    return tryCatch(async () => {
        const { id } = req.params; 
        const properties = await getRelatedProperties(id);
        
        return res.status(200).json({
            message: "Related Properties fetched successfully",
            data: properties
        });
    });
}

/**
 * Handles the request to show a property by its ID.
 * 
 * This function retrieves a property based on the ID provided in the request parameters.
 * 
 * @param req - The request object containing the property ID in the parameters.
 * @param res - The response object used to send the response.
 * @returns A promise that resolves to the result of the tryCatch function.
 */
export const showProperty = async (req: Request, res: Response) => {
    return tryCatch(async () => {
        const { id } = req.params;
        const property = await getPropertyById(id);

        if (!property)
            return res.status(404).json({ success: false, message: 'Property not found' });

        res.status(200).json({ success: true, data: property });
    });
}

/**
 * Controller function to store a new property.
 * 
 * This function handles the request to create a new property. It validates the request data,
 * uploads images, and saves the property to the database. It uses the `tryCatch` utility to
 * handle any potential errors during the process.
 * 
 * @param req - The request object containing the property data and user information.
 * @param res - The response object used to send the response.
 * @returns A promise that resolves to sending a JSON response with the created property data.
 */
export const storeProperty = async (req: CustomRequest, res: Response) => {
    tryCatch(async () => {        
        const validatedData = propertySchema.parse(req.body);        
        const images = await uploadImages(req.files as unknown as Express.Multer.File[]);
        const user = req.user;
        
        if (!user)
            res.status(401).json({ success: false, message: 'Unauthorized' });

        if (!images || images.length === 0)
            return res.status(400).json({ success: false, message: 'Failed to handle images uploaded' });
    
        const property = await createProperty(user.id, {
            title: validatedData.title,
            description: validatedData.description,
            price: validatedData.price,
            location: validatedData.location,
            images: images
        });

        res.status(201).json({ success: true, property });
    }, (error) => {
        if (error instanceof ZodError) {
            return res.status(400).json({ success: false, message: 'Validation error', errors: error.errors });
        }

        return res.status(500).json({ message: error.message });
    });
}

/**
 * Updates a property with the given data and images.
 *
 * @param {CustomRequest} req - The request object containing property data and images.
 * @param {Response} res - The response object to send the result.
 * @returns {Promise<Response>} The response object with the update result.
 *
 * @throws {ZodError} If the validation of the request body fails.
 */
export const updateProperty = async (req: CustomRequest, res: Response) => {
    return tryCatch(async () => {
        const { id } = req.params;
        const validatedData = propertySchema.parse(req.body);
        const images = await uploadImages(req.files as unknown as Express.Multer.File[]);
    
        if (!images) return res.status(404).json({ success: false, message: 'No images found' });

        const property = await updatePropertyModel(id, { ...validatedData, images });

        if (!property)
            return res.status(404).json({ success: false, message: 'Property not found' });

        return res.status(200).json({ success: true, property });
    }, (error) => {
        if (error instanceof ZodError) {
            return res.status(400).json({ success: false, message: 'Validation error', errors: error.errors });
        }
    });
}

/**
 * Deletes a property based on the provided property ID and user information.
 *
 * @param {CustomRequest} req - The request object containing the property ID in the params and user information.
 * @param {Response} res - The response object used to send the HTTP response.
 * @returns {Promise<Response>} - A promise that resolves to the HTTP response indicating the result of the delete operation.
 *
 * @throws {401} - If the user is not authenticated.
 * @throws {404} - If the property is not found.
 * @throws {500} - If there is an internal server error.
 */
export const deleteProperty = async (req: CustomRequest, res: Response) => {
    return tryCatch(async () => {
        const { id } = req.params;
        const user = req.user;

        if (!user)
            return res.status(401).json({ success: false, message: 'Unauthorized' });

        const property = await deletePropertyModel(id, user.id);

        if (!property)
            return res.status(404).json({ success: false, message: 'Property not found' });

        return res.status(200).json({ success: true, message: 'Property deleted successfully' });
    });
}