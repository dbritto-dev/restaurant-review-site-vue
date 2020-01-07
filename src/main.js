import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';

Vue.use(VueCompositionApi);
Vue.config.productionTip = false;

library.add(fas);

Vue.component('faIcon', FontAwesomeIcon);

new Vue({
  render: h => h(App),
}).$mount('#app');
