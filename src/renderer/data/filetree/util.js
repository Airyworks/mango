const path = require('path')

function relativePath(node) {
  if (!node.parent) {
    // this node is root
    return ''
  } else {
    return path.join(relativePath(node.parent), node.text)
  }
}

function absolutePath(node) {
  return path.join(node.root, relativePath(node))
}

module.exports = {
  relativePath,
  absolutePath
}
