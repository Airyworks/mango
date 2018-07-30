const fs = require('electron').remote.require('fs')
const path = require('electron').remote.require('path')

function scanDir(dir) {
  const tree = []
  if (fs.existsSync(dir)) {
    const items = fs.readdirSync(dir)
    for (const item of items) {
      const itemPath = path.join(dir, item)
      const stats = fs.statSync(itemPath)
      const node = { text: item }
      if (stats.isDirectory()) {
        node.children = scanDir(itemPath)
      }
      tree.push(node)
    }
    return tree
  } else {
    throw new Error(`directory '${dir}' does not exist`)
  }
}

module.exports = {
  scanDir
}
