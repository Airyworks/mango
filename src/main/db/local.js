const low = require('lowdb')
const path = require('path')
const FileSync = require('lowdb/adapters/FileSync')
const localDefault = require('../config/local.default.js')

module.exports = (folderPath) => {
  const realPath = path.join(folderPath, '.scarlet.json')
  // if win platform, add hidden attr

  const db = low(new FileSync(realPath, {
    defaultValue: localDefault
  }))
  db.write()
  return db
}
