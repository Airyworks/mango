module.exports = {
  forceReload() {},
  getRoots() {
    return require('../repository/root').getRoots()
  },
  getTree(root) {}
}
