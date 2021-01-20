import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import store from './store';
import Vuelidate from 'vuelidate';
import Axios from '../axiosAPI';
import VueSession from 'vue-session';


Vue.use(VueSession);

Vue.config.productionTip = false;

Vue.$http = Axios;

Vue.use( Vuelidate );

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
