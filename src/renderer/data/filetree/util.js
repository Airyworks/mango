const path = require('path')

export function relativePath(node) {
  if (node.isRoot) {
    // this node is root
    return ''
  } else {
    // return path.join(relativePath(node.parent), node.name)
    return path.relative(node.root, node.path)
  }
}

export function absolutePath(node) {
  // return path.join(node.root, relativePath(node))
  return node.path
}
