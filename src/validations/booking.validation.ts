import { BookingStatus } from "@prisma/client";
import { z } from "zod";

const today = new Date();

export const bookingSchema = z.object({
    propertyId: z.string(),
    checkIn: z.string().refine((date: string): boolean => {
        const checkInDate: Date = new Date(date);
        return checkInDate > today;
    }, {
        message: "Check-in date must be greater than today",
    }),
    checkOut: z.string().superRefine((date: string, context: z.RefinementCtx) => {
        const checkOutDate: Date = new Date(date);
        const checkInDate: Date = new Date(context.path[0]);
        
        if (checkOutDate <= checkInDate) {
            context.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Check-out date must be greater than check-in date",
            });
        }
    }),
    status: z.nativeEnum(BookingStatus).optional(),
});