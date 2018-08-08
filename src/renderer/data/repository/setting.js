const db = require('electron').remote.require('./db').global.configDb

export function getSetting(str) {
  return db.get(str).value()
}
export function setSetting(str, value) {
  db.set(str, value).write()
}
