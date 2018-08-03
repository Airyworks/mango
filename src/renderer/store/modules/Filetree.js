const state = {
  tree: [],
  treeData: []
}

const mutations = {
  initTree(state, treeData) {
    state.treeData.push(...treeData)
  },
  updateTree(state, newData) {
    state.treeData = newData
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  }
}

export default {
  state,
  mutations,
  actions
}
