import Vue from 'vue';
import Vuex, {Module} from 'vuex';

import {LoginModule} from './login.module';
import {UsersModule} from './users.module';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        LoginModule,
        UsersModule,
    },
});
