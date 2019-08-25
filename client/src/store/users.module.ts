
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)
const state = {
    usersOnline: []
}

const getters = {
    
    getUsers(state:any) {
        return state.usersOnline;
    }
}

const mutations = {
    ADD_USER(state:any, user:any){
        state.usersOnline.push(user)
    },

    REMOVE_USER(state:any, user:string){
      state.usersOnline.splice(state.usersOnline.indexOf(user), 1)
    },
}

const actions = {
    addLogin(context:any, username:string){
        context.commit("ADD_USER", username);
    },

    userLogout(context:any, username:string){
        context.commit("REMOVE_USER", username);
    },

        
}

export const UsersModule = {
    state,
    getters,
    actions,
    mutations
};