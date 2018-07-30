<template>
  <div class="sc-viewer" name="viewer">
    <Nav :msg="reading.title"/>
    <div class="sc-viewer-main">
      <img src="/static/test/69108255_p0.jpg"/>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
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
    },
    computed: {
      ...mapState({
        reading: state => state.Reading.reading
      })
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
    .sc-viewer-main
      grid-column 2 / 3
      
</style>
