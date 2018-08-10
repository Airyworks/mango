<template>
  <div class="sc-viewer" name="viewer">
    <Nav :msg="reading.title"/>
    <div class="sc-viewer-main">
      <Gallery :images="images"/>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Nav from '@/components/viewer/Nav'
  import Gallery from '@/components/viewer/Gallery'

  export default {
    name: 'Viewer',
    components: { Nav, Gallery },
    data() {
      return {
        images: [
          '/static/test/69108255_p0.jpg',
          '/static/test/6428005_p0.png',
          '/static/test/46713305_p0.png',
          '/static/test/69108255_p0.jpg?1',
          '/static/test/6428005_p0.png?1',
          '/static/test/46713305_p0.png?1',
          '/static/test/69108255_p0.jpg?2',
          '/static/test/6428005_p0.png?2',
          '/static/test/46713305_p0.png?2'
        ],
        options: {
          index: 0
        }
      }
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
      grid-column 1 / 4
      grid-row 2 / 3
      overflow auto
      
</style>
