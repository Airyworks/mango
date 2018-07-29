<template>
  <div id="app">
    <FileTree/>
    <router-view></router-view>
  </div>
</template>

<script>
  import FileTree from '@/components/common/Filetree'

  export default {
    name: 'Scarlet',
    components: { FileTree }
  }
</script>

<style lang="stylus">
  @import "/static/fonts/source-sans.css"

  *
    box-sizing border-box
    font-family "Lucida Grande", "Lucida Sans Unicode", "Hiragino Sans GB", "	Microsoft YaHei", 'Source Sans Pro', WenQuanYi Micro Hei, Verdana, Aril, sans-serif

  body
    margin 0

  *
    box-sizing: border-box;
    margin: 0
    padding: 0

  a
    color #333

  #app
    display grid
    grid-template-columns 200px 1fr

  .ion
    display inline
    vertical-align middle
  
  .tree-arrow
    display none

  .tree-node.selected > .tree-content
    background-color transparent

</style>
