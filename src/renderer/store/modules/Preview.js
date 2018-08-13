const coverLoader = require('@/data/loader/cover').coverLoader

console.log(coverLoader)

const state = {
  previewList: []
}

const mutations = {
}

const actions = {
  loadPreview ({ commit }, nodeArr) {
    // do something async
    setTimeout(() => {
      console.log(nodeArr)
      const res = coverLoader.loadCover(nodeArr[0])
      console.log(res)
    })
  }
}

export default {
  state,
  mutations,
  actions
}
