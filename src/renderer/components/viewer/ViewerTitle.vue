<template>
  <div class="sc-viewer-title">
    <p>{{ msg }}</p>
  </div>
</template>

<script>
  export default {
    name: 'ViewerTitle',
    components: { },
    data() {
      return {}
    },
    props: {
      msg: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="stylus">
  .sc-nav
    width 100%
    height 100%
    grid-column 1 / 4
    background-color #f3f3f3
    grid-template-columns 60px 1fr 150px
    justify-content center
    .sc-nav-back
      width 60px
      height 100%
      text-align center
      cursor pointer
      transition 0.3s
      &:hover
        background-color #ccc
        color #fff
      
</style>
