<template>
  <div class="sc-filetree">
    <tree
        :data="treeData"
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
  const extensionRule = {
    'video': ['.jpg', '.jpeg', '.png'],
    'video1': ['.mp4', '.avi', '.flv']
  }

  export default {
    name: 'Filetree',
    data () {
      const scanner = require('../../data/filetree/util').scanDir
      const time = new Date()
      const treeData = scanner('D:/Dev/scarlet/src/renderer/components')
      console.log(new Date().getTime() - time.getTime())
      treeData[0].state = { expanded: true }
      treeData[0].data = {
        isFile: true,
        extension: '.jpg'
      }
      return {
        treeOptions: {
          paddingLeft: 10
        },
        treeData
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
      }
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
