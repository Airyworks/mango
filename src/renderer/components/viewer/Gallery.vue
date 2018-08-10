<template>
  <div class="sc-gallary-container" ref="sc-gallary-container">
    <!--
    <div class="sc-gallary" name="viewer">
      <div class="sc-gallary-slider"
        :style="{
          'transition-timing-function': animaOptions.function,
          'transition-duration': (dragOption.dragging ? 50 : animaOptions.duration) + 'ms',
          transform:` translateX(-${currIndex * 100 + dragOption.offset}%)`
        }">
        <div class="sc-gallary-image-wrapper"
          v-for="image in images"
          :key="images.indexOf(image)"
          @mousedown="dragStart"
          @mouseup="dragDone"
          @mousemove="dragMove">
          <div class="sc-gallary-image-container">
            <img class="sc-gallary-image" :src="image">
          </div>
        </div>
      </div>
    </div>
    -->
    <slider class="sc-gallary" ref="slider" :pages="pages" :sliderinit="sliderinit">
    </slider>
    <div class="sc-gallary-actions">
      <button @click="previous">previous</button>
      <button @click="next">next</button>
    </div>
  </div>
</template>

<script>
  import slider from 'vue-concise-slider'
  import GalleryImage from '@/components/viewer/GalleryImage'

  const imageDOM = []
  for (let i = 0; i < 2000; i++) {
    imageDOM.push(i)
  }

  export default {
    name: 'Gallery',
    components: {
      slider,
      GalleryImage
    },
    data() {
      return {
        imageDOM,
        animaOptions: {
          function: 'ease',
          duration: 300
        },
        currIndex: 0,
        dragOption: {
          enable: true,
          dragging: false,
          startX: 0,
          startY: 0,
          x: 0,
          y: 0,
          speedX: 0,
          offset: 0
        },
        gallaryWidth: 0,
        sliderinit: {
          currentPage: 0,
          thresholdDistance: 100,
          thresholdTime: 300,
          loop: true,
          infinite: 1,
          slidesToScroll: 1
        },
        pages: []
      }
    },
    props: {
      images: {
        type: Array,
        default: () => [
          '/static/test/62991712_p0_master1200.jpg'
        ]
      },
      index: {
        type: Number,
        default: 0
      }
    },
    methods: {
      previous() {
        if (this.currIndex > 0) {
          this.currIndex--
        }
      },
      next() {
        if (this.currIndex < this.images.length - 1) {
          this.currIndex++
        }
      },
      resize() {
        this.gallaryWidth = this.$refs['sc-gallary-container'].offsetWidth
      },
      dragStart(e) {
        if (!this.dragOption.enable) {
          return false
        }
        this.dragOption.dragging = true
        this.dragOption.startX = e.clientX
        this.dragOption.startY = e.clientY
        this.dragOption.speedX = 0
        this.dragOption.x = e.clientX
      },
      dragDone(e) {
        if (!this.dragOption.enable) {
          return false
        }
        this.dragOption.dragging = false
        if (this.dragOption.offset > 39 || this.dragOption.speedX > 10) {
          this.next()
        } else if (this.dragOption.offset < -39 || this.dragOption.speedX < -10) {
          this.previous()
        }
        this.dragOption.offset = 0
      },
      dragMove(e) {
        if (!this.dragOption.enable || !this.dragOption.dragging) {
          return false
        }
        this.dragOption.offset = 100 * (this.dragOption.startX - e.clientX) / this.gallaryWidth
        this.dragOption.speedX = this.dragOption.x - e.clientX
        this.dragOption.x = e.clientX
      }
    },
    mounted() {
      this.currIndex = this.index
      this.resize()
      window.addEventListener('resize', this.resize)
      window.addEventListener('mouseup', this.dragDone)
      for (let image of this.images) {
        this.pages.push({
          style: {
            background: `#111`
          },
          component: GalleryImage,
          image
        })
      }
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.resize)
      window.removeEventListener('mouseup', this.dragDone)
    }
  }
</script>

<style lang="stylus">
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
