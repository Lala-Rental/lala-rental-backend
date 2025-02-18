import { IUser } from "./user.types";
import { Request } from 'express';

export interface CustomRequest extends Request {
    user: IUser;
}