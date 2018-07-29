<template>
  <div class="sc-filetree">
    <tree
        :data="treeData"
        ref="tree"
    >
      <span class="tree-text" slot-scope="{ node }">
        <template v-if="!node.hasChildren()">
          <MdStarIcon/>
          {{ node.text }}
        </template>

        <template v-else>
          <IosFolderOpenIcon v-show="node.expanded()"/>
          <MdFolderIcon v-show="!node.expanded()"/>
          {{ node.text }}
        </template>
      </span>
    </tree>
  </div>
</template>

<script>
  import MdFolderIcon from 'vue-ionicons/dist/md-folder'
  import IosFolderOpenIcon from 'vue-ionicons/dist/ios-folder-open'
  import MdStarIcon from 'vue-ionicons/dist/md-star'

  export default {
    name: 'Filetree',
    components: { MdFolderIcon, IosFolderOpenIcon, MdStarIcon },
    data () {
      return {
        treeData: [
          {
            text: 'Disc C:',
            state: { expanded: true },
            children: [
              { text: 'PerfLogs' },
              { text: 'Users',
                children: [
                  { text: 'User 1' },
                  { text: 'User 2' },
                  { text: 'User 3' }
                ]},
              { text: 'tomcat' },
              { text: 'sysCache' },
              { text: 'Program Files',
                children: [
                  { text: 'Intel' },
                  { text: 'Internet Explorer' },
                  { text: 'Opera' },
                  {
                    text: 'Oracle',
                    children: [
                      { text: 'Intel' },
                      { text: 'Internet Explorer' },
                      { text: 'Opera' },
                      { text: 'Oracle' }
                    ]
                  }
                ]}
            ]
          }
        ]
      }
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style lang="stylus" scoped>
.sc-filetree
  width 200px
  .tree
    height 100vh
</style>
