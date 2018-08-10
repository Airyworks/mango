<template>
  <div class="sc-gallary-container" ref="sc-gallary-container">
    <div class="sc-gallary" name="viewer">
      <div class="sc-gallary-slider"
        :style="{
          'transition-timing-function': animaOptions.function,
          'transition-duration': animaOptions.duration + 'ms',
          transform:` translateX(-${currIndex * 100}%)`
        }">
        <div class="sc-gallary-image-wrapper"
          v-for="image in images"
          :key="images.indexOf(image)"
          @mousedown="clickDown($event)"
          @touchstart="clickDown($event)">
        >
          <div class="sc-gallary-image-container">
            <img class="sc-gallary-image" :src="image">
          </div>
        </div>
      </div>
    </div>
    <div class="sc-gallary-actions">
      <button @click="previous">previous</button>
      <button @click="next">next</button>
    </div>
  </div>
</template>

<script>
  const imageDOM = []
  for (let i = 0; i < 2000; i++) {
    imageDOM.push(i)
  }

  export default {
    name: 'Gallary',
    components: {},
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
          startX: 0,
          startY: 0,
          offset: 0
        },
        gallaryWidth: 0
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
      clickDown(e) {
        console.log(e)
        this.dragOption.startX = e.clientX
        this.dragOption.startY = e.clientY
      },
      resize() {
        this.gallaryWidth = this.$refs['sc-gallary-container'].offsetWidth
      }
    },
    mounted() {
      this.currIndex = this.index
      this.resize()
      window.addEventListener('resize', this.resize)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.resize)
    }
  }
</script>

<style lang="stylus" scoped>
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
    .sc-gallary-actions
      position absolute
      bottom 10px
      
</style>
