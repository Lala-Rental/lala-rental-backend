import { Request } from 'express';
import { IUser } from './user.types';

declare module 'express-serve-static-core' {
  interface Request {
    user?: IUser;
  }
}