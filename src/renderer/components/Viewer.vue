<template>
  <div class="sc-viewer" name="viewer">
    <Nav/>
  </div>
</template>

<script>
  import Nav from '@/components/viewer/Nav'

  export default {
    name: 'Viewer',
    components: { Nav },
    data() {
      return {}
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style lang="stylus">
  .sc-viewer
    background-color #fff
    padding 0
    height 100vh
    overflow-y auto
    display grid
    grid-template-rows 60px 1fr 150px
    grid-template-columns 50px 1fr 50px
    justify-content center

</style>
