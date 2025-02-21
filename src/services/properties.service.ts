import { uploadImage } from "./cloudnary.service";

export const uploadImages = async (files: Express.Multer.File[]) : Promise<string[] | void> => {
    const imageUrls: string[] = [];
  
    for (const file of files) {
        const imageUrl = await uploadImage(file.path);
        if (imageUrl) imageUrls.push(imageUrl);
    }
    
    return imageUrls;
};