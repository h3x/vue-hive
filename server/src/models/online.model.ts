import * as mongoose from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';
import {IUser} from '../../../types';
import User from './user.model';

const Schema = mongoose.Schema;

const statusSchema = new Schema({
    user: { required: true, unique: true, index: true, type: mongoose.Schema.Types.ObjectId , ref: User, },
    status: { required: true,  type: String, enum:['online', 'offline', 'ingame']}
});

statusSchema.plugin(uniqueValidator);

const Online = mongoose.model<IUser>('Status', statusSchema, 'status');
export default Online;