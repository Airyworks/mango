const path = require('path')
const filetree = require('../../data/filetree/')

const root = 'D:/Dev/scarlet/src'

filetree.forceReload()
function loadRoot(path) {
  filetree.addRoot(path)
  const rootNode = filetree.tree.find(v => v.root === path)
  console.log(path, rootNode, filetree.roots, filetree.tree)
  return rootNode
}

function modNode(node) {
  node.data = {
    root: node.root,
    name: node.text,
    isFile: node.isFile
  }
  return node
}

const state = {
  tree: []
}

const mutations = {
  initTree(state) {
    state.tree.push(modNode(loadRoot(root)))
  },
  updateTree(state, node) {
    if (node.data.isFile) {
      // do nothing with file
      return
    } else {
      const subFolder = path.join(node.data.root, node.data.name)
      filetree.addRoot(subFolder)
    }
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  }
}

const getters = {
  tree(state) {
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
