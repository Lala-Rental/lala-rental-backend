export interface IBooking {
    id: string;
    checkIn: Date;
    checkOut: Date;
    renterId: string;
    propertyId: string;
    createdAt: Date;
    updatedAt: Date;
}