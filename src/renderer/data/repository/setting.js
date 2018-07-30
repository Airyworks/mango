const db = require('electron').remote.require('./db').global.configDb

module.exports = {
  getSetting(str) {
    return db.get(str).value()
  },
  setSetting(str, value) {
    db.set(str, value).write()
  }
}
