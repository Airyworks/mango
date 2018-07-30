const state = {
  reading: {
    root: '',
    path: '',
    title: ''
  }
}

const mutations = {
  UPDATE_READING_INFO (state, d) {
    Object.assign(state.reading, d)
  }
}

const actions = {
  setReading({ commit }, d) {
    // do something async
    commit('UPDATE_READING_INFO', d)
  }
}

export default {
  state,
  mutations,
  actions
}
