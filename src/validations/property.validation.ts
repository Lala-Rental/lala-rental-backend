import { z } from "zod";

const fileSizeLimit = 5 * 1024 * 1024; // 5MB

export const propertySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().positive("Price must be a positive number"),
  location: z.string().min(3, "Location must be at least 3 characters long"),
  images: z
    .instanceof(File)
    .refine(
      (file) =>
        [
          "image/png",
          "image/jpeg",
          "image/jpg",
          "image/svg+xml",
          "image/gif",
        ].includes(file.type),
      { message: "Invalid document file type" }
    )
    .refine((file) => file.size <= fileSizeLimit, {
      message: "File size should not exceed 5MB",
    }),
});
