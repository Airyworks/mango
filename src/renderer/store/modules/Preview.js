const uuidv1 = require('uuid/v1')
const coverLoader = require('@/data/loader/cover').coverLoader

const urlCreator = window.URL || window.webkitURL

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
    while (state.previewList.length > 0) {
      state.previewList.pop()
    }
  }
}

const actions = {
  loadPreview ({ commit }, nodeArr) {
    commit('CLEAR_PREVIEW')
    for (let i = 0; i < nodeArr.length; i++) {
      const node = nodeArr[i]
      const previewItem = {
        uuid: uuidv1(),
        img: 'static/test/56011481_p0.png',
        title: node.data.name,
        page: 1
      }
      commit('ADD_PREVIEW', previewItem)
      coverLoader.loadCover(node).then(d => {
        const blob = new Blob([d], {type: 'image/jpeg'})
        commit('UPDATE_PREVIEW', {
          originData: previewItem,
          newData: {
            img: urlCreator.createObjectURL(blob)
          }
        })
      })
    }
  }
}

export default {
  state,
  mutations,
  actions
}
