import Vue from 'vue';
import Vuex from 'vuex';



Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
      username: 'pete',
      loggedIn: false    
  },
  getters: {
    getLogin: state => {
        return state.username;
    }
  },  
  mutations: {
    LOGIN:(state, username) => {
        state.username = username;
        state.loggedIn = true;
    },
    LOGOUT:(state) => {
        state.username = '';
        state.loggedIn = false;
    }
  },
  actions: {
    userLogin: (context, username) => {
        context.commit("LOGIN", username);
    },
    userLogout: (context) => {
        context.commit("LOGOUT");
    }
  },
});

export default store;