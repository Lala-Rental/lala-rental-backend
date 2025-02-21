import { BookingStatus } from "@prisma/client";

export interface IBooking {
    id: string;
    checkIn: Date;
    checkOut: Date;
    renterId: string;
    status: BookingStatus;
    propertyId: string;
    createdAt: Date;
    updatedAt: Date;
}