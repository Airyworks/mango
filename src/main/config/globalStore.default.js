const globalDefault = require('./global.default')
module.exports = {
  data: {
    time: 0,
    times: 0, // total reading books times
    pages: 0,
    books: 0 // total books
  },
  files: {
    root: [],
    magnetDir: globalDefault.downloadDir
  },
  tags: {}
}
