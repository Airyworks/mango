const low = require('lowdb')
const path = require('path')
const app = require('electron').app
const globalDefault = require('../config/global.default.js')
const storeDefault = require('../config/globalStore.default.js')

export const userDataPath = app.getPath('userData')
export const configPath = path.join(userDataPath, 'config.json')
export const storePath = path.join(userDataPath, 'store.json')
global['userDataPath'] = userDataPath
global['configPath'] = configPath
global['storePath'] = storePath

const FileSync = require('lowdb/adapters/FileSync')

module.exports = {
  configDb: low(new FileSync(configPath, { defaultValue: globalDefault })),
  storeDb: low(new FileSync(storePath, { defaultValue: storeDefault }))
}
