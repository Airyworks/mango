<template>
  <div class="sc-preview">
    <div class="sc-preview-img-container">
      <img class="sc-preview-img" src="/static/test/56011481_p0.png">
    </div>
    <div class="sc-preview-intro-container">
      <p class="sc-preview-intro-title">性感荷官</p>
      <a class="sc-preview-intro-more">18P</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Preview',
    components: { },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style lang="stylus" scoped>
.sc-preview
  margin 10px 20px
  width 180px
  padding 0
  display inline-block
  box-shadow: 0 2px 4px 1px rgba(0, 0, 0, 0.2)
  transition 0.5s
  .sc-preview-img-container
    width 100%
    height 100px
    overflow hidden
    .sc-preview-img
      width 100%
  .sc-preview-intro-container
    width 100%
    padding 15px
    text-align left
    .sc-preview-intro-title
      margin 0
    .sc-preview-intro-more
      font-size .625rem
      font-weight light
      letter-spacing .3em
      line-height 1.3em
</style>
