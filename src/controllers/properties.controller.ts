import { Request, Response } from 'express';
import { tryCatch } from '../utils/trycatch';
import { createProperty, getAllProperties, getPropertyById, updateProperty as updatePropertyModel, deleteProperty as deletePropertyModel } from '../models/property.model';
import { propertySchema } from '../validations/property.validation';
import { uploadImages } from '../services/properties.service';
import { IUser } from '../types/user.types';

interface CustomRequest extends Request {
    user: IUser;
}

/**
 * List all properties
 * 
 * @param req Request
 * @param res Response
 */
export const listProperties = async (_req: Request, res: Response) => {
    return tryCatch(async () => {
        const properties = await getAllProperties();
        return res.status(200).json(properties);
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

        res.status(200).json({ success: true, property });
    });
}

/**
 * Store Property
 * 
 * @param req Request
 * @param res Response
 */
export const storeProperty = async (req: CustomRequest, res: Response) => {
    return tryCatch(async () => {
        const validatedData = propertySchema.parse(req.body);
        const images = await uploadImages(validatedData.images as unknown as Express.Multer.File[]);
        const user = req.user;
        
        if (!user)
            return res.status(401).json({ success: false, message: 'Unauthorized' });

        const property = await createProperty(user.id, {
            title: validatedData.title,
            description: validatedData.description,
            price: validatedData.price,
            location: validatedData.location,
            images: images
        });

        return res.status(201).json({ success: true, property });
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
        const images = await uploadImages(validatedData.images as unknown as Express.Multer.File[]);
        const property = await updatePropertyModel(id, { ...validatedData, images });

        if (!property)
            return res.status(404).json({ success: false, message: 'Property not found' });

        return res.status(200).json({ success: true, property });
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