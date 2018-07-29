<template>
  <div class="sc-preview"
    @click="open">
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
    data() {
      return { }
    },
    methods: {
      open(e) {
        this.$router.push('viewer')
      }
    }
  }
</script>

<style lang="stylus" scoped>
.sc-preview
  margin 10px 0
  width 180px
  padding 0
  display inline-block
  box-shadow: 0 2px 4px 1px rgba(0, 0, 0, 0.2)
  transition 0.3s
  cursor pointer
  transform-origin 0.5
  &:hover
    transform translateY(-1px)
    box-shadow: 0 5px 12px 1px rgba(0, 0, 0, 0.3)
  &:active
    box-shadow: 0 2px 12px 1px rgba(156, 182, 216, 0.5)
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
