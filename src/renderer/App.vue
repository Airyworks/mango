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
    font-family "Lucida Grande", "Lucida Sans Unicode", "Hiragino Sans GB", "Microsoft YaHei", 'Source Sans Pro', WenQuanYi Micro Hei, Verdana, Aril, sans-serif
    user-select none

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
  
  .tree-text
    height 20px
    font-size 11px

  .tree-arrow
    margin-left 0
    display none
  .tree-arrow.has-child
    width 15px
  .tree-arrow.has-child:after
    transform rotate(-45deg) translateY(-50%) translateX(0) scale(0.5)
  .tree-arrow.expanded.has-child:after
    transform rotate(45deg) translateY(-50%) translateX(-5px) scale(0.5)

  .tree-content
    height 20px
  .tree-node.selected > .tree-content
    background-color transparent
  .tree-anchor
    padding 3px 2px
</style>
