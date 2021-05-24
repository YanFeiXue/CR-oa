import Vue from 'vue'
import App from '@/App'
import router from './router'
import store from './store/store'
import md5 from 'js-md5';
Vue.prototype.$md5 = md5;
import './plugins'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
