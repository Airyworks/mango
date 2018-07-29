<template>
  <div class="sc-nav" name="nav">
    <IosArrowBackIcon h="60px" w="20px"/>
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
</style>
