import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router';
import './assets/style.css';
import { store } from './store/store';
// @ts-ignore
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';

Vue.config.productionTip = false;

const socket = io('http://localhost:3001');
Vue.use(VueSocketIOExt, socket, {store});

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
