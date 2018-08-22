import Vue from 'vue'
import axios from 'axios'
import VueTree from 'liquor-tree'
import MuseUI from 'muse-ui'
import VueI18n from 'vue-i18n'
import MuseUILoading from 'muse-ui-loading'
import MuseUIToast from 'muse-ui-toast'

import 'muse-ui/dist/muse-ui.css'
import 'material-icons/iconfont/material-icons.scss'
import 'ionicons/dist/scss/ionicons.scss'
import 'muse-ui-loading/dist/muse-ui-loading.css'
import App from './App'
import router from './router'
import store from './store'

window.server = require('./data/server').server

Vue.use(VueTree)
Vue.use(MuseUI)
Vue.use(MuseUILoading)
Vue.use(MuseUIToast)
Vue.use(VueI18n)

// need to import after Vue.use(VueI18n)
const i18n = require('./i18n').default

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  i18n,
  template: '<App/>'
}).$mount('#app')
