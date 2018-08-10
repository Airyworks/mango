import Vue from 'vue'
import axios from 'axios'
import VueTree from 'liquor-tree'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'material-icons/iconfont/material-icons.scss'
import 'ionicons/dist/scss/ionicons.scss'
import App from './App'
import router from './router'
import store from './store'

Vue.use(VueTree)
Vue.use(MuseUI)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
