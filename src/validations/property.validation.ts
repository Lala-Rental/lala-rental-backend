import { z } from "zod";
import { File } from "multer";

export const propertySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().positive("Price must be a positive number"),
  location: z.string().min(3, "Location must be at least 3 characters long"),
  images: z.array(z.instanceof(File)).nonempty("At least one image is required"),
});
