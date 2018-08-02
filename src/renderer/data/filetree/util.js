const path = require('path')

function relativePath(node) {
  if (!node.father) {
    // this node is root
    return ''
  } else {
    return path.join(relativePath, node.text)
  }
}

function absolutePath(node) {
  return path.join(node.root, relativePath(node))
}

module.exports = {
  relativePath,
  absolutePath
}
