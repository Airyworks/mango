const uuidv1 = require('uuid/v1')

// const urlCreator = window.URL || window.webkitURL

const state = {
  previewList: []
}

const mutations = {
  ADD_PREVIEW(state, data) {
    state.previewList.push(data)
  },
  UPDATE_PREVIEW(state, {originData, newData}) {
    Object.assign(originData, newData)
  },
  CLEAR_PREVIEW(state) {
    while (state.previewList.pop());
  }
}

const actions = {
  loadPreview ({ commit }, nodeArr) {
    commit('CLEAR_PREVIEW')
    for (let i = 0; i < nodeArr.length; i++) {
      const node = nodeArr[i]
      const previewItem = {
        uuid: uuidv1(),
        image: node.image,
        title: node.name,
        path: node.path,
        root: node.root,
        page: 1
      }
      commit('ADD_PREVIEW', previewItem)
      // coverLoader.loadCover(node).then(d => {
      //   const blob = new Blob([d], {type: 'image/jpeg'})
      //   commit('UPDATE_PREVIEW', {
      //     originData: previewItem,
      //     newData: {
      //       img: urlCreator.createObjectURL(blob)
      //     }
      //   })
      // })
    }
  }
}

export default {
  state,
  mutations,
  actions
}
