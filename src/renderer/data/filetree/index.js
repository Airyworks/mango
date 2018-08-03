const path = require('path')

const scanDir = require('electron').remote.require('./fs').util.scanDir
const isExists = require('electron').remote.require('./fs').util.isExists
const isDirectory = require('electron').remote.require('./fs').util.isDirectory
const findCover = require('electron').remote.require('./fs').util.findCover

const absolutePath = require('./util').absolutePath
const rootDisplayPath = path.basename

let tree = []
let roots = []

function scanChildren(node) {
  const children = scanDir(absolutePath(node))
  children.forEach((value, index, arr) => {
    arr[index] = Object.assign({
      image: undefined,
      expanded: false,
      root: node.root,
      parent: node
    }, value)
  })

  return children
}

function copyExpandedTree(from, to) {
  to.expanded = from.expanded
  to.children = scanChildren(to)
  for (const child of from.children) {
    const toChild = to.children.find(v => v.text === child.text)
    if (toChild &&
        !child.isFile &&
        !toChild.isFile &&
        child.expanded) {
      copyExpandedTree(child, toChild)
    }
  }
}

function refreshCover(node) {
  if (node.isFile) {
    return
  }
  if (node.expanded) {
    node.image = findCover(absolutePath(node))
    for (const child of node.children) {
      refreshCover(child)
    }
  } else {
    node.image = findCover(absolutePath(node))
  }
}

module.exports = {
  forceReload() {
    const newTree = []
    roots = require('../repository/root').getRoots()

    // if missing, ignore(do NOT write back to db)
    roots = roots.filter(dir => isExists(dir) && isDirectory(dir))

    for (const root of roots) {
      newTree.push({
        text: rootDisplayPath(root),
        root,
        image: undefined,
        expanded: false,
        parent: null,
        isFile: false,
        children: []
      })
    }
    for (const root of tree) {
      const newRoot = newTree.find(v => v.root === root.root)
      if (newRoot) {
        if (root.expanded) {
          newRoot.expanded = true
          copyExpandedTree(root, newRoot)
        }
      }
    }
    tree = newTree

    for (const node of tree) {
      refreshCover(node)
    }
  },
  open(node) {
    if (node.isFile) {
      return
    }
    node.expanded = true

    // load children
    const children = scanChildren(node)
    // compare difference between the new and the old
    const reserve = node.children.filter(
      v => children.find(
        k => k.text === v.text && k.isFile === v.isFile
      )
    )
    const append = children.filter(
      v => node.children.find(
        k => k.text !== v.text || k.isFile !== v.isFile
      )
    )
    node.children = reserve.concat(append)

    // load cover
    for (const child of node.children) {
      if (!child.isFile) {
        // use cache
        if (child.image) {
          continue
        }
        // if cover not found, image is undefined
        child.image = findCover(absolutePath(child))
      }
    }
  },
  close(node) {
    if (node.isFile) {
      return
    }
    node.expanded = false
  },
  addRoot(root) {
    require('../repository/root').insertRoot(root)
    if (!roots.find(v => v === root) &&
        isExists(root) &&
        isDirectory(root)) {
      roots.push(root)
      tree.push({
        text: rootDisplayPath(root),
        root,
        image: undefined,
        expanded: false,
        parent: null,
        isFile: false,
        children: []
      })
    }
  },
  delRoot(root) {
    require('../repository/root').delRoot(root)
    roots = roots.filter(v => v !== root)
    if (tree.find(v => v.root === root)) {
      tree = tree.filter(v => v.root === root)
    }
  },
  tree,
  roots
}
