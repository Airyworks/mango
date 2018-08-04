const filetree = require('../../data/filetree/')

const root = 'C:\\Users\\lwhcv\\Documents\\Workspace\\scarlet'

function loadRoot(path) {
  filetree.addRoot(path)
  const rootNode = filetree.tree.find(v => v.root === path)
  filetree.open(rootNode)
  console.log(path, rootNode, filetree.roots, filetree.tree)
  return rootNode
}

function modNode(node) {
  node.data = {
    root: node.root,
    name: node.text,
    isFile: node.isFile,
    origin: node
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
      return true
    } else {
      // const subFolder = path.join(node.data.root, node.data.name)
      // console.log(subFolder)
      filetree.open(node.data.origin)
      console.log(filetree.tree)
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
