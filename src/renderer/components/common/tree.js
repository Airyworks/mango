
const _ = require('lodash')
const filetree = require('@/data/filetree/').filetree
function wrapNode(node) {
  const data = _.omit(node, ['children'])
  data.origin = node
  const wrapped = {
    data,
    state: {
      editable: false
    }
  }
  if (!node.isFile) {
    wrapped.children = node.children.map(wrapNode)
  }
  return wrapped
}

export default {
  data () {
    return {
      treeData: []
    }
  },
  computed: {
    tree() {
      return this.$refs.tree.tree
    }
  },
  methods: {
    reRenderTree() {
      this.tree.setModel(this.treeData)
    },
    addRoot(root) {
      const rootNode = filetree.addRoot(root)
      this.$refs.tree.append(wrapNode(rootNode))
    },
    delRoot(node) {
      console.log(node, this.treeData.length)
      const root = node.data.root
      // for (let i = 0; i < this.treeData.length; i++) {
      //   console.log(this.treeData[i].data)
      //   if (this.treeData[i].data.root === root) {
      //     this.treeData.splice(i, 1)
      //   }
      // }
      // this.reRenderTree()
      filetree.delRoot(root)
      this.forceReload()
    },
    init() {
      filetree.forceReload()
      filetree.tree.forEach(v => {
        this.treeData.push(wrapNode(v))
      })
      this.reRenderTree()
    },
    forceReload() {
      filetree.forceReload()
      this.treeData = []
      this.reRenderTree()
      filetree.tree.forEach(v => {
        this.$refs.tree.append(wrapNode(v))
      })
    },
    openNode(node) {
      const origin = node.data.origin
      if (!origin.isFile && origin.children.length === 0) {
        filetree.openNode(origin)
        origin.children.map(wrapNode).forEach(v => {
          node.append(v)
        })
      }
      node.expand()
    }
  }
}
