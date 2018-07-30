const db = require('electron').remote.require('./db').global.storeDb
const files = db.get('files')

module.exports = {
  getRoots() {
    return files.get('root').value()
  },
  delRoot(path) {
    const rootSet = new Set(files.get('root').value())
    rootSet.delete(path)
    files.set('root', Array.from(rootSet)).write()
  },
  insertRoot(path) {
    const rootSet = new Set(files.get('root').value())
    rootSet.add(path)
    files.set('root', Array.from(rootSet)).write()
  },
  getMagnetDir() {
    return require('./setting').getSetting('downloadDir')
  }
}
