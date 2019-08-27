import Vue from 'vue';
import Vuex from 'vuex';



Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
      username: 'pete',
      loggedIn: false,
  },
  getters: {
    getLogin: (_state: any) => {
        return _state.username;
    },
  },
  mutations: {
    LOGIN: (_state: any, username: string) => {
        _state.username = username;
        _state.loggedIn = true;
    },
    LOGOUT: (_state: any) => {
        _state.username = '';
        _state.loggedIn = false;
    },
  },
  actions: {
    userLogin: (context: any, username: string) => {
        context.commit('LOGIN', username);
    },
    userLogout: (context: any) => {
        context.commit('LOGOUT');
    },
  },
});

export default store;
