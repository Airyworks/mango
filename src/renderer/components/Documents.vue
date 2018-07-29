<template>
  <div class="sc-documents">
    <div class="sc-preview-container">
      <Preview v-for="i in previewArr" :key="i" :data="i"/>
    </div>
  </div>
</template>

<script>
  import Preview from '@/components/documents/Preview'

  export default {
    name: 'Documents',
    components: { Preview },
    data() {
      return {
        previewArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
          11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26]
      }
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style lang="stylus">
  .sc-documents
    background-color #fff
    padding 0
    padding-top 25px
    height 100vh
    overflow-y auto

    .sc-preview-container
      display flex
      flex-wrap wrap


</style>
