import Vue from 'vue';
import Vuex from 'vuex'
import App from './App.vue';
import router from './router';
import './assets/style.css';
import { store } from './store/LoginStore';

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
