import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (filePath: string): Promise<string | void> => {
    const result = await cloudinary.uploader.upload(filePath);
    const imageUrl = result.secure_url;
    
    return imageUrl;
};