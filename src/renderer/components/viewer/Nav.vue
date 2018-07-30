<template>
  <div class="sc-nav" name="nav">
    <div class="sc-nav-back" @click="back">
      <IosArrowBackIcon h="60px" w="20px"/>
    </div>
  </div>
</template>

<script>
  import IosArrowBackIcon from 'vue-ionicons/dist/ios-arrow-back'

  export default {
    name: 'Nav',
    components: { IosArrowBackIcon },
    data() {
      return {}
    },
    methods: {
      back() {
        this.$router.push('documents')
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
