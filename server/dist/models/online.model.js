"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const user_model_1 = require("./user.model");
const Schema = mongoose.Schema;
const statusSchema = new Schema({
    user: { required: true, unique: true, index: true, type: mongoose.Schema.Types.ObjectId, ref: user_model_1.default, },
    status: { required: true, type: String, enum: ['online', 'offline', 'ingame'] }
});
statusSchema.plugin(uniqueValidator);
const Online = mongoose.model('Status', statusSchema, 'status');
exports.default = Online;
//# sourceMappingURL=online.model.js.map