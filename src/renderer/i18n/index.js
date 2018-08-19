import VueI18n from 'vue-i18n'
const zhCN = require('./resources/zh-CN.json')
const ja = require('./resources/ja.json')
const en = require('./resources/en.json')

console.log(ja, en)

const app = require('electron').remote.app
console.log(app.getLocale())
export default new VueI18n({
  locale: app.getLocale(),
  fallbackLocale: 'en',
  messages: {
    'zh-CN': zhCN,
    ja,
    en
  }
})
