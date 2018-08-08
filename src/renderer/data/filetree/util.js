const path = require('path')

export function relativePath(node) {
  if (!node.parent) {
    // this node is root
    return ''
  } else {
    return path.join(relativePath(node.parent), node.text)
  }
}

export function absolutePath(node) {
  return path.join(node.root, relativePath(node))
}
