import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import gasApi from './api'
Vue.prototype.$gas = gasApi

import VueGoogleHeatmap from 'vue-google-heatmap';
Vue.use(VueGoogleHeatmap, {
  apiKey: process.env.VUE_APP_GOOGLE_MAP_API,
});

import dayjs from 'dayjs'
import 'dayjs/locale/ja'
dayjs.locale('ja')
Vue.prototype.$dayjs = dayjs

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
