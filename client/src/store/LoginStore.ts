import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({

    state: {
        username: '',
        loggedIn: false    
    },

    getters: {
        getLogin: state => {
            return {username:state.username, isLoggedin: state.loggedIn};
    }
    },  

    mutations: {
        LOGIN:(state, username) => {
            state.username = username;
            state.loggedIn = true;
            console.log(state.username)
        },

        LOGOUT:(state) => {
            state.username = '';
            state.loggedIn = false;
        }
    },
    actions: {
        userLogin: (context, username) => {
            console.log(context, username)
            context.commit("LOGIN", username);
        },
        
        userLogout: (context) => {
            context.commit("LOGOUT");
        }
    },
    })


