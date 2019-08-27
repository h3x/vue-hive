
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const state = {
    usersOnline: [],
};

const getters = {

    getUsers(_state: any) {
        return _state.usersOnline;
    },
};

const mutations = {
    ADD_USER(_state: any, user: any) {
        _state.usersOnline.push(user);
    },

    REMOVE_USER(_state: any, user: string) {
      _state.usersOnline.splice(_state.usersOnline.indexOf(user), 1);
    },
};

const actions = {
    addLogin(context: any, username: string) {
        context.commit('ADD_USER', username);
    },

    userLogout(context: any, username: string) {
        context.commit('REMOVE_USER', username);
    },


};

export const UsersModule = {
    state,
    getters,
    actions,
    mutations,
};
