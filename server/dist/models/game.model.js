"use strict";
// Describes the database schema for users
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;
const gameSchema = new Schema({
    game: { required: true, unique: true, index: true, type: String, },
    blackPlayer: { type: String, },
    whitePlayer: { required: true, type: String, },
    moves: [Schema.Types.Mixed],
    finished: { required: true, type: Boolean, },
    winner: { type: String },
});
gameSchema.plugin(uniqueValidator);
const Game = mongoose.model('Game', gameSchema, 'game');
exports.default = Game;
//# sourceMappingURL=game.model.js.map