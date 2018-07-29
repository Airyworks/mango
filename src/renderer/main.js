import Vue from 'vue'
import axios from 'axios'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import App from './App'
import router from './router'
import store from './store'

Vue.use(MuseUI)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

const dd = require('electron').remote.require('./db')
console.log(dd)
// const cgdb = require('electron').remote.require('./db/global').configDb
// const sgdb = require('electron').remote.require('./db/global').storeDb
// const ldbf = require('electron').remote.require('./db/local')
// const ldb = ldbf('E:\\test')
// cgdb.write()
// sgdb.write()
// ldb.write()

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
