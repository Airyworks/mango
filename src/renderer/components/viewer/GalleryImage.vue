<template>
  <div class="sc-gallary-image-container">
    <img class="sc-gallary-image" :src="item.image">
  </div>
</template>

<script>
export default {
  name: 'GalleryImage',
  props: ['item', 'sliderinit', 'pages'],
  components: { }
}
</script>

<style lang="stylus" scoped>
.sc-gallary-image-container
  height 100%
  .sc-gallary-image
    height 100%
</style>
