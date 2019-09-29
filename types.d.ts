import { Document } from 'mongoose';

// Describes the user entries in the users document
export interface IUser extends Document {
    _id: string,
    name: string,
    token: string,
    status: string,
    password: string,
}

// Describes a user for login 
export interface INewUser {
    name: string,
    token?: string,
    password: string,
} 

// Describes a game board for each move
export interface IGameState {
    move: number,
    player: string,
    board: Array<any>,
}

// Describes a game
export interface IGame extends Document {
    blackPlayer?: string,
    whitePlayer: string,
    game: string,
    moves: Array<any>,
    winner?: string,
    finished: boolean,
}

// describes user information that is safe to be passed to all clients
export interface IUserShort {
    name: string,
    status: string,
}