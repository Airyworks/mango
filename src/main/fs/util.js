const fs = require('fs')
const path = require('path')
const imageExt = require('../config/extname').image

// use recursive will spend too much time
export function scanDir(dir, recursive = false) {
  const tree = []
  if (fs.existsSync(dir)) {
    const items = fs.readdirSync(dir)
    for (const item of items) {
      const itemPath = path.join(dir, item)
      const stats = fs.statSync(itemPath)
      const node = { text: item, isFile: true }
      if (stats.isDirectory()) {
        node.isFile = false
        if (recursive) {
          node.children = scanDir(itemPath)
        } else {
          node.children = []
        }
      }
      tree.push(node)
    }
    return tree
  } else {
    throw new Error(`directory '${dir}' does not exist`)
  }
}

// find the cover image in a folder
// return absolute path to the image/ or undefined
export function findCover(dir) {
  const files = fs.readdirSync(dir)
  for (const v of files) {
    const realPath = path.join(dir, v)
    if (!isDirectory(realPath) && imageExt.find(x => x === path.extname(v))) {
      return realPath
    }
  }
  return undefined
}

export function isImage(dir) {
  if (!isExists(dir) || isDirectory(dir)) {
    return false
  } else {
    return !!imageExt.find(v => v === path.extname(dir))
  }
}

export function isExists(dir) {
  return fs.existsSync(dir)
}

export function isDirectory(dir) {
  const stats = fs.statSync(dir)
  return stats.isDirectory()
}
