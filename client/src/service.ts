import axios, { AxiosResponse, AxiosError } from 'axios';
import {INewUser, IUserShort} from '../../types';
import { Socket } from 'vue-socket.io-extended';


export const origin = () => {
    //return 'http://localhost:3001';
    return window.location.origin;
};

// Get a username based on a token
export const getMyUsernameService = (token: string) => {
    return axios.get(origin() + '/api/user', {params: {token}})
    .then((res: AxiosResponse) => res.data,
        (err: AxiosError) => { throw new Error(`${err}`); });
};

// Signup service
export const newUserService = (user: INewUser) => {
    return axios.post(origin() + '/api/signup', user)
    .then((res: AxiosResponse) => (res),
        (err: AxiosError) => {
            throw new Error('Username in use. Please choose a different username');
        });
};

// Get log in creds
export const loggedInService = (token: string|null) => {
    if (!token || token === undefined) {
        throw new Error('Incorrect Username or Passoword');
    }
    return axios.get(origin() + '/api/user', { params: { token }})
            .then((res: AxiosResponse) => {
                return res.data.user;
            },
            (err: AxiosError) => { throw new Error('Incorrect Username or Password'); });
};

// Log out user
export const logoutService = (username: string) => {
    return axios.post(origin() + '/api/logout', {name: username})
      .then((res: AxiosResponse) => {
        localStorage.clear();
      },
      (err: AxiosError) => { throw new Error('problem logging out'); });
};

// Get all onling users according to the database
export const getOnlineUsersService = (username: string) => {
    return axios.get(origin() + '/api/users')
          .then((res: AxiosResponse) => {
            return res.data.users.filter((el: IUserShort) => el.status === 'online');
          })
          .catch((err: AxiosError) => { throw new Error('Error contacting database'); });
};

// Login and set token
export const setNewTokenService = (user: INewUser) => {
    return axios.post(origin() + '/api/login', user)
        .then((res: AxiosResponse) => ({token: res.data.token}) )
        .catch((err: AxiosError) => { throw new Error('Invalid Credentials'); });
};

// Get current state of the game board
export const getBoardService = (gameID: string) => {
    return axios.get(origin() + '/api/board', {params: {game: gameID}})
        .then((res: AxiosResponse) => res.data.gameBoard)
        .catch((err: AxiosError) => { throw new Error('Invalid Game ID'); });
};

// Returns if a game is finished according to specific player and gameID
export const gameFinishedService = (gameID: string, player: string) => {
    return axios.post(origin() + '/api/gameFinished', {game: gameID, player})
    .catch((err: AxiosError) => { throw new Error('Invalid Game ID'); });
};

// Returns all unfinished games acording to username
export const getUnfinishedGamesService = (playerID: string) => {
    return axios.get(origin() + '/api/unfinished', {params: {player: playerID}})
            .catch((err: AxiosError) => { throw new Error('No matching player'); });
};

// Returns all games a user has played
export const getAllGamesService = (playerID: string) => {
    return axios.get(origin() + '/api/allGames', {params: {player: playerID}})
            .catch((err: AxiosError) => { throw new Error('No matching player'); });
};
