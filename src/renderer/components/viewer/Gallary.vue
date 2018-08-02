<template>
  <div class="sc-gallary-container">
    <div class="sc-gallary" name="viewer">
      <div class="sc-gallary-slider"
        :style="{
          'transition-timing-function': animaOptions.function,
          'transition-duration': animaOptions.duration + 'ms',
          transform:` translateX(-${index * 100}%)`
        }">
        <div class="sc-gallary-image-wrapper" v-for="image in images" :key="images.indexOf(image)">
          <div class="sc-gallary-image-container">
            <img class="sc-gallary-image" :src="image">
          </div>
        </div>
      </div>
    </div>
    <div class="sc-gallary-actions">
      <button @click="index++">next</button>
      <button @click="index--">previous</button>
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
        }
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
