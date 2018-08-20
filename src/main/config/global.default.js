const app = require('electron').app
const path = require('path')

export const scrollMouse = 'page'
export const scrollAltMouse = 'scale'
export const bossKey = {
  ctrl: true,
  alt: false,
  shift: false,
  key: 'esc'
}
export const scrollDirection = 'horizontal'
export const scaleSize = 1
export const password = ''
export const downloadDir = path.join(app.getPath('downloads'), 'scarlet/')
export const maxDownloadProc = 5
export const zipPasswords = []
export const downloadProxy = false
