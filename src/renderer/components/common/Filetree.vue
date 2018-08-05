<template>
  <div class="sc-filetree">
    <tree
        :options="treeOptions"
        ref="tree"
    >
      <span class="sc-tree-text" slot-scope="{ node }"
        :before-init-node="node.data.fileType = testExtension(node.data.extension)">
        <template v-if="node.data.isFile">
          <mu-icon value="photo" class="sc-filetree-icon" v-if="node.data.fileType == 'img'"></mu-icon>
          <mu-icon value="videocam" class="sc-filetree-icon" v-if="node.data.fileType == 'video'"></mu-icon>
          <mu-icon value="insert_drive_file" class="sc-filetree-icon" v-if="node.data.fileType == 'other'"></mu-icon>
          {{ node.text }}
        </template>

        <template v-else>
          <mu-icon value="keyboard_arrow_down" class="sc-filetree-icon" v-show="node.expanded()"></mu-icon>
          <mu-icon value="keyboard_arrow_right" class="sc-filetree-icon" v-show="!node.expanded()"></mu-icon>
          {{ node.text }}
        </template>
      </span>
    </tree>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  const extensionRule = {
    'img': ['.jpg', '.jpeg', '.png'],
    'video': ['.mp4', '.avi', '.flv']
  }

  export default {
    name: 'Filetree',
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
        }
        // treeOptions: {
        //   paddingLeft: 10,
        //   fetchData(node) {
        //     console.log(node)
        //     return `/assets/data/fetch0/data-${node.id}.json`
        //   }
        // },
        // treeData: filetree.tree[0]
        // treeData: [
        //   {
        //     text: 'Disc C:',
        //     state: { expanded: true },
        //     children: [
        //       { text: 'PerfLogs' },
        //       { text: 'Users',
        //         children: [
        //           { text: 'User 1' },
        //           { text: 'User 2' },
        //           { text: 'User 3' }
        //         ]},
        //       { text: 'tomcat' },
        //       { text: 'sysCache' },
        //       { text: 'Program Files',
        //         children: [
        //           { text: 'Intel' },
        //           { text: 'Internet Explorer' },
        //           { text: 'Opera' },
        //           {
        //             text: 'Oracle',
        //             children: [
        //               { text: 'Intel' },
        //               { text: 'Internet Explorer' },
        //               { text: 'Opera' },
        //               { text: 'Oracle' }
        //             ]
        //           }
        //         ]}
        //     ]
        //   }
        // ]
      }
    },
    computed: {
      eventsList() {
        return this.events.concat().reverse()
      }
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
      ...mapMutations(['initTree', 'updateTree'])
    },
    mounted() {
      // this.updateTree([{text: 'hello'}])
      // eventsList.forEach(e => {
      //   this.$refs.tree.$on(e.name, this.initEventViewer(e))
      // })
      this.$refs.tree.$on('tree:mounted', e => {
        this.initTree(e.data)
      })
      this.$refs.tree.$on('node:expanded', e => {
        console.log('node:expanded', e.data.text)
        this.updateTree(e)
      })
      this.$refs.tree.$on('node:selected', e => {
        console.log('node:selected', e.data.text)
      })
    }
  }
</script>

<style lang="stylus" scoped>
.sc-filetree
  width 200px
  .tree
    height 100vh
  .sc-filetree-icon
    font-size 10px
</style>
