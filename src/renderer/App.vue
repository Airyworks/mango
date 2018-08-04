<template>
  <div id="app" @click="coreValuePopup">
    <FileTree/>
    <router-view></router-view>
    <div v-if="enableCoreValue" ref="core-value"></div>
  </div>
</template>

<script>
  import FileTree from '@/components/common/Filetree'

  const coreValueList = ['富强', '民主', '文明', '和谐', '自由', '平等', '公正', '法治', '爱国', '敬业', '诚信', '奶子']

  export default {
    name: 'Scarlet',
    components: { FileTree },
    data() {
      return {
        enableCoreValue: true,
        coreIndex: 0
      }
    },
    methods: {
      coreValuePopup(e) {
        if (!this.enableCoreValue) {
          return false
        } else {
          const eleText = document.createElement('span')
          eleText.className = 'core-value-text-popup'
          this.$refs['core-value'].appendChild(eleText)
          if (!coreValueList[this.coreIndex]) {
            this.coreIndex = 0
          }
          eleText.innerHTML = coreValueList[this.coreIndex]
          eleText.addEventListener('animationend', function () {
            eleText.parentNode.removeChild(eleText)
          })
          eleText.style.left = (e.clientX - eleText.clientWidth / 2) + 'px'
          eleText.style.top = (e.clientY - eleText.clientHeight) + 'px'
          this.coreIndex++
        }
      }
    }
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
  
  .sc-tree-text
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

.core-value-text-popup
  animation: core-value-textPopup 1s
  color: red
  user-select: none
  white-space: nowrap
  position: absolute
  z-index: 99

@keyframes core-value-textPopup
  0%, 100%
    opacity: 0
  5%
    opacity: 1
  100%
    transform: translateY(-50px)
</style>
