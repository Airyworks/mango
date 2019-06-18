<template>
  <img :src="fullPath"/>
</template>

<script>
export default {
  name: 'ScImg',
  computed: {
    fullPath() {
      return this.src.startsWith('/') ? ('file://' + this.src) : this.src
    }
  },
  props: {
    src: {
      type: String,
      required: true
    }
  }
}
</script>

<style>

</style>
