// this is child process

const Koa = require('koa2')
let app = null
let server = null

process.on('message', msg => {
  switch (msg.message) {
    case 'server-listen':
      const roots = msg.data
      app = new Koa()
      for (const root of roots) {
        app.use(require('koa-static')(root))
      }
      server = app.listen(12346)
      break
    case 'is-server-listening':
      process.send(server.listening)
      break
    case 'server-close':
      server.close()
      process.exit()
  }
})
