const filetree = require('../../data/filetree/').filetree

const root = 'D:\\Dev\\scarlet'

function loadRoot(path) {
  filetree.addRoot(path)
  const rootNode = filetree.tree.find(v => v.root === path)
  filetree.openNode(rootNode)
  console.log(path, rootNode, filetree.roots, filetree.tree)
  return rootNode
}

function modNode(node) {
  // const newNode = {
  //   data: {
  //     root: node.root,
  //     name: node.text,
  //     isFile: node.isFile,
  //     origin: node,
  //     image: node.image
  //   },
  //   text: node.text
  // }
  node.data = {
    root: node.root,
    name: node.text,
    isFile: node.isFile,
    origin: node,
    image: node.image
  }
  if (node.isFile) {
    node.children = []
    node.states = { expanded: false }
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
      console.log('updateTree', node.text, node)
      // if (node.state.expanded) {
      //   node.state.expanded = false
      // }
      // const subFolder = path.join(node.data.root, node.data.name)
      // console.log(subFolder)
      node.state.expanded = true
      filetree.openNode(node.data.origin, modNode)
      node.data.origin.children.forEach(element => {
        // modNode(element)
        const newEl = modNode(element)
        node.append(newEl)
      })
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
