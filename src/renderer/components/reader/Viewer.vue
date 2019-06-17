<template>
  <div class="sc-viewer" name="viewer">
    <Nav :msg="reading.title" :filePath="reading.path"/>
    <div class="sc-viewer-main">
      <ReaderSlider ref="slider" :options="options" :items="images">
        <template v-slot:item="{ item, index, active }">
          <ReaderItem :index="index" :active="active">
            <ScImg :src="item"/>
            <!-- <p>index: {{ index }}</p> -->
          </ReaderItem>
        </template>
      </ReaderSlider>
      <div class="sc-gallary-actions sc-viewer-buttons">
        <mu-button fab small color="primary" @click="$refs.slider.prev()">
          <mu-icon value="navigate_before"></mu-icon>
        </mu-button>
        <mu-button fab small color="primary" @click="$refs.slider.next()">
          <mu-icon value="navigate_next"></mu-icon>
        </mu-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Nav from '@/components/viewer/Nav'
  // import Gallery from '@/components/viewer/Gallery'
  import Vue from 'vue'
  import Reader from 'scarlet-reader'
  import ScImg from '@/components/reader/ScImg.vue'
  import Book from '@/data/book/'
  Vue.use(Reader)

  export default {
    name: 'Viewer',
    // components: { Nav, Gallery },
    components: { Nav, ScImg },
    mounted() {
      console.log(this, this.reading)
      this.book = new Book(this.reading.path)
    },
    data() {
      return {
        book: { imagePaths: [] },
        options: {
          direction: 'horizon',
          virtual: true,
          inertia: true,
          height: '80vh',
          width: '80vw',
          margin: '2px',
          scale: '100%'
        }
      }
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    },
    computed: {
      images() {
        return this.book.imagePaths
      },
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
    // height 60vh
    // overflow-y auto
    // display grid
    // grid-template-rows 60px 1fr 150px
    // grid-template-columns 50px 1fr 50px
    // justify-content center
    // .sc-viewer-main
    //   grid-column 1 / 4
    //   grid-row 2 / 3
    //   overflow auto

  .sc-viewer-buttons
    width 20%
    margin 1vh auto

  .sc-gallary-container
    width 100%
    height 100%
    position relative
    .sc-gallary
      overflow hidden
      white-space nowrap
      height 100%
      width 100%
      background-color #111
      .sc-gallary-slider
        height 100%
        .sc-gallary-image-wrapper
          height 100%
          width 100%
          display inline-block
          white-space nowrap
          text-align center
          .sc-gallary-image-container
            display inline-block
            height 100%
            .sc-gallary-image
              height 100%
              user-drag none
              -webkit-user-drag none
              user-select none
    .sc-gallary-actions
      position absolute
      bottom 10px
      
</style>
