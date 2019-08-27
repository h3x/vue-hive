// import {User} from '@/types' // att3mpt this when not on a deadline

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const state = {
    username: '',
    loggedIn: false,
};




const getters = {
    getLogin(_state: any) {
        return {username: _state.username, isLoggedin: _state.loggedIn};
    },

    getOnlineUsers(_state: any): string[] {
        return _state.usersOnline;
    },

};

const mutations = {
    LOGIN(_state: any, username: string) {
        _state.username = username;
        _state.loggedIn = true;
    },

    LOGOUT(_state: any) {
        _state.username = '';
        _state.loggedIn = false;
    },

};


const actions = {
    userLogin(context: any, username: any) {
        // console.log(username)
        context.commit('LOGIN', username);
    },

    userLogout(context: any) {
        context.commit('LOGOUT');
    },
};

export const LoginModule = {
    state,
    getters,
    actions,
    mutations,
};
