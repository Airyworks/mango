const app = require('electron').app
const path = require('path')

module.exports = {
  scrollMouse: 'page',
  scrollAltMouse: 'scale',
  bossKey: {
    ctrl: true,
    alt: false,
    shift: false,
    key: [
      'esc'
    ]
  },
  scrollDirection: 'vertical',
  scaleSize: 1,
  password: '',
  downloadDir: path.join(app.getPath('downloads'), 'scarlet/'),
  maxDownloadProc: 5,
  zipPasswords: [],
  downloadProxy: false
}
