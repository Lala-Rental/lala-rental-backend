import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";
import { tryCatch } from '../utils/trycatch';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (filePath: string): Promise<string | void> => {
    return tryCatch(async () => {
        const result = await cloudinary.uploader.upload(filePath);
        return result.secure_url;
    }, (error) => {
        console.error('Error uploading image:', error);
        throw error;
    });
}
