const db = require('electron').remote.require('./db').global.storeDb
const localDb = require('electron').remote.require('./db').local
const data = db.get('data')

module.exports = {
  global: {
    getAttr(str) {
      return data.get(str).value()
    },
    setAttr(str, value) {
      data.set(str, value).write()
    },
    add(str, n = 1) {
      data.set(str, n + data.get(str).value()).write()
    }
  },
  local (path) {
    const localData = localDb(path).get('data')
    return {
      getAttr(str) {
        return localData.get(str).value()
      },
      setAttr(str, value) {
        localData.set(str, value).write()
      },
      add(str, n = 1) {
        localData.set(str, localData.get(str).value() + n).write()
      }
    }
  }
}
