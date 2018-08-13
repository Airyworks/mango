const path = require('path')
const fsLoader = require('electron').remote.require('./fs').loader

export const viewLoader = new class ViewLoader {
  constructor() {
    this.queue = []
    this.isLoading = false
  }

  loop() {
    // shift loaded image from queue loadIndex
    // note the item might be delete from removeBookCache

    if (this.isLoading) {
      return
    }

    let item
    while (true) {
      item = this.queue.find(i => i.active)
      if (!item) {
        this.isLoading = false
        return
      }
      if (item.loadIndex.length !== 0) {
        break
      }
      item.active = false
      item.complete = true
    }
    const filename = item.loadIndex.shift()
    const realPath = path.join(item.path, filename)
    this.isLoading = true
    fsLoader(realPath).then(data => {
      this.isLoading = false
      // note item could be delete
      // donot worry ↑
      // leave this scope item will be distroyed
      item.data[filename] = data
    }).catch(err => {
      console.error(err)
      this.isLoading = false
      item.data[filename] = false
    }).finally(() => {
      this.loop()
    })
  }

  loadBook(book, indices) {
    const nodePath = book.absolute
    if (this.queue.find(v => v.path === nodePath)) {
      return
    }
    const item = {
      path: nodePath,
      data: {},
      loadIndex: indices,
      complete: false,
      active: true
    }
    book.images.forEach(v => {
      item.data[v] = undefined
    })
    this.queue.push(item)

    this.loop()
  }

  // if user change {process}, NEED to fetch
  // new indices;
  // if book's {node.children} changed, remember to
  // stop loading this book(stopLoadBook) and re-add
  // it to queue(loadBook) with new files
  updateIndices(book, indices) {
    const item = this.queue.find(v => v.path === book.absolute)
    if (!item) {
      return
    }
    item.loadIndex = indices.filter(v => item.loadIndex.find(x => x === v))

    this.loop()
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

    this.loop()
  }

  stopLoadAll() {
    this.queue.forEach(v => { v.active = false })
  }

  resumeLoadAll() {
    this.queue.forEach(v => { v.active = true })

    this.loop()
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
