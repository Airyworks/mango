<template>
  <div class="sc-filetree">
    <div class="sc-filetree-controller">
      <p class="sc-filetree-controller-msg">Explorer</p>
      <div class="sc-filetree-controller-icongroup">
        <mu-icon
          @click="addDir"
          value="add"
          class="sc-filetree-controller-icon" />
        <mu-icon
          @click="forceReload"
          value="autorenew"
          class="sc-filetree-controller-icon" />
      </div>
    </div>
    <tree
      :options="treeOptions"
      ref="tree"
      class="sc-filetree-tree">
      <span class="sc-tree-text" slot-scope="{ node }"
        :before-init-node="node.data.fileType = testExtension(node.data.extension)"
        @mouseup="openContextMenu(node, $event)">
        <template v-if="node.data.isFile">
          <mu-icon value="photo" class="sc-filetree-icon" v-if="node.data.fileType == 'img'" />
          <mu-icon value="videocam" class="sc-filetree-icon" v-if="node.data.fileType == 'video'" />
          <mu-icon value="insert_drive_file" class="sc-filetree-icon" v-if="node.data.fileType == 'other'" />
          {{ node.text }}
        </template>

        <template v-else>
          <div>
            <mu-icon value="keyboard_arrow_down" class="sc-filetree-icon" v-show="node.expanded()" />
            <mu-icon value="keyboard_arrow_right" class="sc-filetree-icon" v-show="!node.expanded()" />
            <span>{{ node.text }}</span>
          </div>
          <!--
          using right click menu
          <mu-icon value="remove" class="sc-filetree-icon sc-filetree-icon-remove" v-if="node.data.isRoot" />
          -->
        </template>
      </span>
    </tree>
    <context-menu class="sc-context-menu" ref="ctxMenu">
      <li @click="removeRoot">Remove</li>
      <li @click="doSomething">反人类400</li>
    </context-menu>
  </div>
</template>

<script>
  import { mapMutations, mapActions, mapState } from 'vuex'
  import contextMenu from 'vue-context-menu'
  import { selectDir, selectFile } from '@/data/dialog'

  const extensionRule = {
    'img': ['.jpg', '.jpeg', '.png'],
    'video': ['.mp4', '.avi', '.flv']
  }

  export default {
    name: 'Filetree',
    components: { contextMenu },
    data () {
      return {
        events: [],
        treeOptions: {
          paddingLeft: 10,
          store: {
            store: this.$store,
            getter: 'getTree'
            // mutations: [...mapMutations(['initTree', 'updateTree'])]
          }
        },
        contextNode: undefined
      }
    },
    computed: {
      eventsList() {
        return this.events.concat().reverse()
      },
      ...mapState({
        tree: state => state.Filetree.tree
      })
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      testExtension(ext) {
        if (!ext) return 'other'
        for (let t in extensionRule) {
          if (extensionRule[t].indexOf(ext) >= 0) return t
        }
        return 'other'
      },
      addDir() {
        const newDir = selectDir()
        if (newDir) {
          this.initTree(newDir[0])
        }
      },
      forceReload() {
        console.log(selectFile())
      },
      openContextMenu(node, e) {
        console.log(node.text, e)
        if (e.which === 3 && node.data.isRoot) {
          this.contextNode = node
          this.$refs.ctxMenu.open()
          e.stopPropagation()
        }
      },
      removeRoot() {
        if (this.contextNode) {
          this.delRoot(this.contextNode)
        }
      },
      doSomething() {
        alert('🐔2💥💥')
      },
      ...mapMutations([]),
      ...mapActions(['initTree', 'updateTree', 'delRoot', 'loadPreview'])
    },
    mounted() {
      this.$refs.tree.$on('node:expanded', e => {
        // this.updateTree(e)
      })
      this.$refs.tree.$on('node:selected', e => {
        // this.updateTree(e)
        // if (!e.expanded()) {
        //   this.updateTree(e)
        // }
        console.log(e)
        const previewNodeArr = []
        for (let i = 0; i < e.children.length; i++) {
          if (!e.children[i].data.isFile) {
            previewNodeArr.push(e.children[i])
          }
        }
        if (previewNodeArr.length > 0) {
          this.loadPreview(previewNodeArr)
        }
        if (!e.data.isFile && e.children.length === 0) {
          console.log('node:selected', e.text)
          this.updateTree(e)
        }
      })
    }
  }
</script>

<style lang="stylus" scoped>
$controller-height = 20px

.sc-filetree
  width 200px
  overflow-x auto
  position relative
  .sc-filetree-tree
    height calc(100vh - $controller-height)
    min-width 100%
    position absolute
    top $controller-height
    z-index 4
  .sc-filetree-icon
    font-size 10px
  .sc-filetree-icon-remove
    float right
    line-height 20px
  .sc-filetree-controller
    height $controller-height
    width 100%
    position absolute
    background-color #eee
    z-index 5
    .sc-filetree-controller-msg
      font-size 12px
      line-height $controller-height
      padding-left 5px
      color #999
    .sc-filetree-controller-icongroup
      position absolute
      top 0
      right 0
      height $controller-height
      padding-right 5px
      background-color #eee
      .sc-filetree-controller-icon
        font-size 14px
        line-height $controller-height
        height $controller-height
        cursor pointer

</style>
