const db = require('electron').remote.require('./db').global.storeDb
const tags = db.get('tags')

module.exports = {
  getTags() {
    return tags.value()
  },
  getTag(tag) {
    return tags.get(tag).value()
  },
  setTag(tagName, root, path) {
    const tag = tags.get(tagName).value()
    const data = {
      root,
      relativePath: path
    }
    if (!tag) {
      tags.set(tagName, [data]).write()
    } else {
      // console.log(tags.get(tagName).find(data).value())
      if (tags.get(tagName).find(data).value() === undefined) {
        tags.get(tagName).push(data).write()
      }
      // const tagSet = new Set(tag.map(JSON.stringify))
      // tagSet.add(JSON.stringify(data))
      // tags.set(tagName, Array.from(tagSet).map(JSON.parse)).write()
    }
  },
  delTag(tagName, root, path) {
    // const tag = tags.get(tagName).value()
    tags.get(tagName).remove({root, relativePath: path}).write()
    // const tagSet = new Set(tag.map(JSON.stringify))
    // tagSet.delete(JSON.stringify({root, relativePath: path}))
    // tags.set(tagName, Array.from(tagSet).map(JSON.parse)).write()
    if (tags.get(tagName).size().value() === 0) {
      tags.unset(tagName).write()
    }
  }
}
