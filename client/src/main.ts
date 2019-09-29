import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router';
import './assets/style.css';
import { store } from './store/store';
import { origin } from './service';

// @ts-ignore
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';

Vue.config.productionTip = false;

// const socket = io('https://boiling-wildwood-41441.herokuapp.com');
const socket = io(origin());

Vue.use(VueSocketIOExt, socket, {store});

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
