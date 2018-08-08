const findCover = require('electron').remote.require('./fs').util.findCover
const fsLoader = require('electron').remote.require('./fs').loader

// donot need to stop loading
export const coverLoader = new class CoverLoader {
  constructor() {
    // { path: "C:\\xxx", data: Buffer|undefined }
    this.queue = []
    this.isLoading = false
  }

  loop() {
    if (this.isLoading) {
      return
    }
    const item = this.queue.find(v => v.data === undefined)
    if (item) {
      this.isLoading = true
      fsLoader(item.path).then(data => {
        this.isLoading = false
        item.data = data
        item.resolve(data)
      }).catch(err => {
        console.log(err)
        this.isLoading = false
        item.data = false
        item.reject(err)
      }).finally(() => {
        this.loop()
      })
    }
  }

  loadCover(node) {
    if (!node.image) {
      // give another one chance
      node.image = findCover(node)
      if (!node.image) {
        return false
      }
    }

    let item
    const available = this.queue.find(i => i.path === node.image)
    if (!available) {
      let resolved, rejected
      item = {
        path: node.image,
        data: undefined,
        promise: new Promise((resolve, reject) => {
          resolved = resolve
          rejected = reject
        }) }
      item.resolve = resolved
      item.reject = rejected
      this.queue.push(item)
      this.loop()
      return item.promise
    } else {
      return available.promise
    }
  }
}()
