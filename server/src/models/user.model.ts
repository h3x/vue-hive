// Describes the database schema for users

import * as mongoose from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';
import {IUser} from '../../../types';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { required: true, unique: true, index: true, type: String, },
    password: { required: true,  type: String, },
    status:{required: true, type: String, enum:['online', 'offline', 'ingame']},
    token: String,
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model<IUser>('User', userSchema, 'users');
export default User;