// let requestService = (function(){
  
//     let serverPath = window.location.origin // gets the server, protocol, and port from the URL
  
//     return {
//       requestUser: (userId) -> {
//         // code for making a request to the server and getting 
//         // a promise containing a user record
//       }
  
//       // etc
  
//     }
  
//   })()

import axios, { AxiosResponse, AxiosError } from 'axios';
import {INewUser} from '../../types'

export const origin = ()=>{
    
}

export const newUserService = (user:INewUser) => {
    return axios.post('http://localhost:3001/api/signup', user)
    .then((res:AxiosResponse) => {
            // all good
        },
        (err:AxiosError) => {
            throw new Error('Username in use. Please choose a different username');
        });
}

export const loggedInService = (token:string) => {
    return axios.get('http://localhost:3001/api/user', { headers: { token: token}})
            .then((res:AxiosResponse) => {
                return res.data.user.name;
            },
            (err:AxiosError) => {
                throw new Error('Incorrect Username or Password')
            });
}

export const logoutService = (username:string) => {
    return axios.post('http://localhost:3001/api/logout', {name: username})
      .then((res:AxiosResponse) => {
        localStorage.clear();
      },
      (err:AxiosError) => { throw new Error('problem logging out') }
    );
}

