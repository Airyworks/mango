const low = require('lowdb')
const path = require('path')
const FileSync = require('lowdb/adapters/FileSync')
const localDefault = require('../config/local.default.js')

module.exports = (folderPath) => {
  return {
    db: low(new FileSync(path.join(folderPath, '.scarlet.json'), {
      defaultValue: localDefault
    }))
  }
}
