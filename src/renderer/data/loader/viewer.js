const path = require('path')
const fsLoader = require('electron').remote.require('./fs').loader
const rangeHead = 2
const rangeTail = 4

module.exports = new class Loader {
  constructor() {
    this.queue = []
    this.promise = undefined
  }

  loop() {
    // shift loaded image from queue loadIndex
    // note the item might be delete from removeBookCache

  }

  loadBook(book, indexes) {
    const nodePath = book.absolute
    if (this.queue.find(v => v.path === nodePath)) {
      return
    }
    const item = {
      path: nodePath,
      data: {},
      loadIndex: indexes,
      complete: false,
      active: true
    }
    book.images.forEach(v => {
      item.data[v] = undefined
    })
    this.queue.push(item)
  }

  updateIndexes(book, indexes) {
    const item = this.queue.find(v => v.path === book.absolute)
    if (!item) {
      return
    }
    item.loadIndex = indexes.filter(v => item.loadIndex.find(x => x === v))
  }

  stopLoadBook(book) {
    const item = this.queue.find(v => v.path === book.absolute)
    if (!item) {
      return false
    }
    item.active = false
  }

  resumeLoadBook(book) {
    const item = this.queue.find(v => v.path === book.absolute)
    if (!item) {
      return false
    }
    item.active = true
  }

  stopLoadAll() {
    this.queue.forEach(v => { v.active = false })
  }

  resumeLoadAll() {
    this.queue.forEach(v => { v.active = true })
  }

  removeBookCache(book) {
    this.queue = this.queue.filter(v => v.path !== book.absolute)
  }

  removeAllCache() {
    while (this.queue.pop()) {}
  }

  getBookData(book) {
    const item = this.queue.find(v => v.path === book.absolute)
    if (!item) {
      return false
    }
    return item.data
  }
}()
