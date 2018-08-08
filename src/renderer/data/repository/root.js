const db = require('electron').remote.require('./db').global.storeDb
const files = db.get('files')

export function getRoots() {
  return files.get('root').value()
}
export function delRoot(path) {
  const rootSet = new Set(files.get('root').value())
  rootSet.delete(path)
  files.set('root', Array.from(rootSet)).write()
}
export function insertRoot(path) {
  const rootSet = new Set(files.get('root').value())
  rootSet.add(path)
  files.set('root', Array.from(rootSet)).write()
}
export function getMagnetDir() {
  return require('./setting').getSetting('downloadDir')
}
