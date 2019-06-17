const fileRepoProv = require('../repository/file').file
const path = require('path')
const scanDir = require('electron').remote.require('./fs').util.scanDir
const checkIfImage = require('electron').remote.require('./fs').util.isImage
const findName = (dir) => {
  return path.parse(dir).name
}

function transSortFunc(sort) {
  switch (sort) {
    case 1:
      return (a, b) => {
        const [nameA, nameB] = [findName(a), findName(b)]
        const [numberA, numberB] = [parseInt(nameA), parseInt(nameB)]
        if (!isNaN(numberA) && !isNaN(numberB)) {
          return numberA - numberB
        } else {
          return nameA > nameB ? 1 : -1
        }
      }
    case 2:
      return (a, b) => {
        const [nameA, nameB] = [findName(a), findName(b)]
        const [numberA, numberB] = [parseInt(nameA), parseInt(nameB)]
        if (!isNaN(numberA) && !isNaN(numberB)) {
          return numberB - numberA
        } else {
          return nameA < nameB ? 1 : -1
        }
      }
  }
}

export default class Book {
  constructor(path) {
    this.path = path
    this.repo = fileRepoProv(this.path)

    // this.images: ["xxx.jpg", "xxx.png", ...]
    this.reload()
    this.resort()
  }

  get imagePaths() {
    return this.images.map(v => path.join(this.path, v))
  }

  resort() {
    if (!Array.isArray(this.sort)) {
      const sortFunc = transSortFunc()
      this.images.sort(sortFunc)
    } else {
      // resort images with sort array
      // new images = sort ∩ images + (images - sort)
      const newImages = []
      this.sort.forEach(v => {
        if (this.images.find(v)) {
          newImages.push(v)
        }
      })
      this.images.forEach(v => {
        if (!this.sort.find(v)) {
          newImages.push(v)
        }
      })
      this.images = newImages
    }
  }

  reload() {
    this.images = scanDir(this.path).filter(v => checkIfImage(v.path)).map(v => v.name)
  }

  get process() {
    return this.repo.getAttr('process')
  }

  set process(page) {
    this.repo.setAttr('process', page)
  }

  get sort() {
    return this.repo.getAttr('sort')
  }

  /**
   * sort: Array | Func
   */
  set sort(sort) {
    this.repo.setAttr('sort', sort)
    this.resort()
  }

  get label() {
    return this.repo.getAttr('label')
  }

  // filename: "xxx.png"
  addLabel(filename, color) {
    return this.repo.addLabel(filename, color)
  }

  delLabel(filename) {
    return this.repo.delLabel(filename)
  }
}
