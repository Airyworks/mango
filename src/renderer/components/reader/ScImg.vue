<template>
  <img :src="src"/>
</template>

<script>
export default {
  name: 'ScImg',
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
