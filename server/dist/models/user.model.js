"use strict";
// Describes the database schema for users
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: { required: true, unique: true, index: true, type: String, },
    password: { required: true, type: String, },
    status: { required: true, type: String, enum: ['online', 'offline', 'ingame'] },
    token: String,
});
userSchema.plugin(uniqueValidator);
const User = mongoose.model('User', userSchema, 'users');
exports.default = User;
//# sourceMappingURL=user.model.js.map