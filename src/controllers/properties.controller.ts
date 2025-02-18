import { Request, Response } from 'express';
import { tryCatch } from '../utils/trycatch.util';
import { createProperty, getAllProperties, getPropertyById, updateProperty as updatePropertyModel, deleteProperty as deletePropertyModel } from '../models/property.model';
import { propertySchema } from '../validations/property.validation';
import { uploadImages } from '../services/properties.service';
import { ZodError } from 'zod';
import { CustomRequest } from '../types/request.types';

/**
 * List all properties
 * 
 * @param req Request
 * @param res Response
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
 * Show Single Property
 * 
 * @param req Request
 * @param res Response
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
 * Store Property
 * 
 * @param req Request
 * @param res Response
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
 * Update Property
 * 
 * @param req Request
 * @param res Response
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
 * Dlete Given Property
 * 
 * @param req Request
 * @param res Response
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