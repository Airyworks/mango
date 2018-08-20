<template>
  <div class="sc-documents" name="documents" ref="documents">
    <div class="sc-preview-container"
      :style="{ width: containerWidth + 'px' }">
      <Preview v-for="item in previewList" :key="previewList.indexOf(item)"
        :img="item.img"
        :title="item.title"
        :page="item.page"/>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Preview from '@/components/documents/Preview'

  export default {
    name: 'Documents',
    components: { Preview },
    data() {
      return {
        containerWidth: 1000
      }
    },
    computed: {
      ...mapState({
        previewList: state => state.Preview.previewList
      })
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      calcContainerWidth() {
        if (!this.$refs['documents']) return setTimeout(this.calcContainerWidth, 50)
        const maxWidth = this.$refs['documents'].offsetWidth - 40
        const rowCount = Math.floor(maxWidth / 220)
        this.containerWidth = rowCount * 220
      }
    },
    mounted() {
      this.calcContainerWidth()
      window.addEventListener('resize', this.calcContainerWidth)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.calcContainerWidth)
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
    display grid
    grid-template-columns 20px auto 20px
    justify-content center

    .sc-preview-container
      grid-column-start 2
      & > div
        float left
      // display flex
      // flex-wrap wrap
      // justify-content flex-start //space-around
      // for i in 1..20
      //   @media (min-width: (220 + 200 * (i))px) and (max-width: (220 + 200 * (i + 1))px)
      //     grid-template-columns: repeat(i, 200px)
</style>
