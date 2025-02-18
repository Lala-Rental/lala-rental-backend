import { z } from "zod";

export const propertySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.string(),
  location: z.string().min(3, "Location must be at least 3 characters long"),
});