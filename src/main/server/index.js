const childProcess = require('child_process')
const path = require('path')
module.exports = new class {
  constructor() {
    this.child = null
  }
  startServer(roots) {
    if (!this.child) {
      this.child = childProcess.fork(path.join(__dirname, './server.js'), {
        cwd: process.cwd()
      })
      this.child.send({
        message: 'server-listen',
        data: roots
      })
      this.child.on('exit', () => {
        this.child = null
      })
    }
  }
  stopServer() {
    this.child.send({
      message: 'server-close'
    })
  }
}()
