const fs = require('fs')
/*
 * files: ['C:/XXX.png', 'C:/XXX2.png']
 */
// function* genLoader(files) {
//   for (const file of files) {
//     const interrupt = yield {
//       path: file,
//       buffer: fs.readFileSync(file)
//     }
//     if (interrupt) {
//       return
//     }
//   }
// }

// module.exports = (files) => {
//   return genLoader(files)
// }

module.exports = file => new Promise((resolve, reject) => {
  fs.readFile(file, (err, data) => {
    if (err) {
      reject(err)
    } else {
      resolve(data)
    }
  })
})
