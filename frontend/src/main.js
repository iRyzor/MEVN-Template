import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Plugins
import bootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import vueAxios from 'vue-axios'

Vue.use(bootstrapVue)
Vue.use(vueAxios, axios)
axios.defaults.baseURL = 'http://localhost:3000/api'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
