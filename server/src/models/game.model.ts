// Describes the database schema for users

import * as mongoose from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';
import {IGame, IUserShort} from '../../../types';

const Schema = mongoose.Schema;

const gameSchema = new Schema({
    game: { required: true, unique: true, index: true, type: String, },
    blackPlayer: {type: String,},
    whitePlayer: {required: true, type: String,},
    moves: [Schema.Types.Mixed],
    finished: {required: true, type: Boolean,},
    winner: {type: String},
});

gameSchema.plugin(uniqueValidator);

const Game = mongoose.model<IGame>('Game', gameSchema, 'game');
export default Game;