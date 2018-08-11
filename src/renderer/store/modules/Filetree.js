const filetree = require('../../data/filetree/').filetree

function loadRoot(path) {
  filetree.addRoot(path)
  const rootNode = filetree.tree.find(v => v.root === path)
  filetree.openNode(rootNode)
  return rootNode
}

function modNode(node, isRoot = false) {
  node.data = {
    root: node.root,
    name: node.text,
    isFile: node.isFile,
    origin: node,
    image: node.image,
    isRoot
  }
  if (node.isFile) {
    node.children = []
  }
  return node
}

const state = {
  tree: []
}

const mutations = {
  INIT_TREE(state, data) {
    state.tree.push(data)
  },
  UPDATE_TREE(state, node) {
    filetree.openNode(node.data.origin)
    node.data.origin.children.forEach(element => {
      modNode(element)
    })
    node.state('expanded', true)
  }
}

const actions = {
  initTree({ commit }, root) {
    // do something async
    const tree = modNode(loadRoot(root), true)
    tree.children.forEach(element => {
      modNode(element)
    })
    commit('INIT_TREE', tree)
  },
  updateTree({ commit }, node) {
    if (node.data.isFile) {
      // do nothing with file
      return true
    } else {
      commit('UPDATE_TREE', node)
    }
  },
  delRoot({ commit }, root) {
    console.log(root)
  }
}

const getters = {
  getTree(state) {
    console.log(state)
    return state.tree
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
