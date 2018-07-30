const db = require('electron').remote.require('./db').local

module.exports = (path) => ({
  getAttr(str) {
    return db(path).get(str).value()
  },
  setAttr(str, value) {
    db(path).set(str, value).write()
  },
  addLabel(filename, color) {
    const pathDb = db(path)
    if (!pathDb.get('label').find({ page: filename }).value()) {
      pathDb.get('label').push({
        color,
        page: filename
      }).write()
    } else {
      pathDb.get('label').find({ page: filename }).assign({
        color,
        page: filename
      }).write()
    }
  },
  delLabel(filename) {
    db(path).get('label').remove({page: filename}).write()
  }
})
