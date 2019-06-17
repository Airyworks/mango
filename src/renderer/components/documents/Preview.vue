<template>
  <div class="sc-preview"
    @click="open()">
    <div class="sc-preview-img-container">
      <img class="sc-preview-img" :src="url">
    </div>
    <div class="sc-preview-intro-container">
      <p class="sc-preview-intro-title">{{ title }}</p>
      <a class="sc-preview-intro-more">{{ page }}P</a>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { DEFAULT_PREVIEW, DEFAULT_TITLE } from '@/config/'

  export default {
    name: 'Preview',
    components: { },
    data() {
      return {}
    },
    computed: {
      url() {
        return this.image
          .replace(/#/g, '%23')
          .replace(/\?/g, '%3F')
          .replace(/&/g, '%26')
          .replace(/\+/g, '%2B')
          .replace(/=/g, '%3D')
          .replace(/@/g, '%40')
          .replace(/\$/g, '%24')
      }
    },
    props: {
      title: {
        type: String,
        default: DEFAULT_TITLE
      },
      image: {
        type: String,
        default: DEFAULT_PREVIEW
      },
      path: {
        type: String,
        default: ''
      },
      root: {
        type: String,
        default: ''
      },
      page: {
        type: Number,
        default: 0
      }
    },
    methods: {
      open() {
        console.log('preview:', this.$props)
        this.setReading({
          root: this.root,
          path: this.path,
          title: this.title
        })
        this.$router.push('viewer')
      },
      ...mapActions(['setReading'])
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
