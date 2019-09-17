import { Document } from 'mongoose';

export interface IUser extends Document {
    _id: string,
    name: string,
    token: string,
    status: string,
    password: string,
}


export interface INewUser {
    name: string,
    token: string,
    password: string,
} 