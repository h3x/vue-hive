//import {User} from '@/types' // att3mpt this when not on a deadline

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)
const state = {
    username: '',
    loggedIn: false,
}




const getters = {    
    getLogin(state:any) {
        return {username:state.username, isLoggedin: state.loggedIn};
    },

    getOnlineUsers(state:any){
        return state.usersOnline
    }

}

const mutations = {
    LOGIN(state:any, username:string){
        state.username = username;
        state.loggedIn = true;
    },

    LOGOUT(state:any){
        state.username = '';
        state.loggedIn = false;
    }

}


const actions = {
    userLogin(context:any, username:any){
        //console.log(username)
        context.commit("LOGIN", username);
    },
    
    userLogout(context:any){
        context.commit("LOGOUT");
    }
}

export const LoginModule = {
    state,
    getters,
    actions,
    mutations
};