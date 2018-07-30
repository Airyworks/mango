<template>
  <div class="sc-nav" name="nav">
    <div class="sc-nav-back" @click="back">
      <IosArrowBackIcon h="60px" w="20px"/>
    </div>
    <div class="sc-nav-title-container">
      <mu-tooltip content="提示信息">
        <p class="sc-nav-title">{{ msg || msgPlaceholder }}</p>
      </mu-tooltip>
    </div>
    <div class="sc-nav-title-actions">
      <mu-button class="sc-nav-title-button" ref="button" small color="primary" @click="open = !open">
        <IosMoreIcon h="60px" w="20px"/>
      </mu-button>
      
      <mu-popover cover :open.sync="open" :trigger="trigger" placement="bottom-end">
        <mu-list>
          <mu-list-item button class="sc-n xv-title-more-btn" ref="copy" @click="copyTitle">
              <mu-list-item-title>
                <IosCopyIcon h="26px" w="16px"/>
              </mu-list-item-title>
          </mu-list-item>
          <mu-list-item button class="sc-nav-title-more-btn">
            <mu-list-item-title>
              <MdStarOutlineIcon h="26px" w="20px"/>
            </mu-list-item-title>
          </mu-list-item>
          <mu-list-item button class="sc-nav-title-more-btn">
            <mu-list-item-title>
              <IosTrash h="26px" w="20px"/>
            </mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-popover>
    </div>
  </div>
</template>

<script>
  import IosArrowBackIcon from 'vue-ionicons/dist/ios-arrow-back'
  import IosMoreIcon from 'vue-ionicons/dist/ios-more.vue'
  import MdMoreIcon from 'vue-ionicons/dist/md-more.vue'
  import MdStarOutlineIcon from 'vue-ionicons/dist/md-star-outline.vue'
  import IosTrash from 'vue-ionicons/dist/ios-trash.vue'
  import MdCopyIcon from 'vue-ionicons/dist/md-copy.vue'
  import IosCopyIcon from 'vue-ionicons/dist/ios-copy.vue'
  import { clipboard } from 'electron'

  export default {
    name: 'Nav',
    components: {
      IosArrowBackIcon,
      IosMoreIcon,
      MdMoreIcon,
      MdStarOutlineIcon,
      IosTrash,
      MdCopyIcon,
      IosCopyIcon
    },
    data() {
      return {
        open: false,
        trigger: null,
        msgPlaceholder: '自宅突撃イキなりギンギン伝説 嗜虐幻想郷 この素晴らしいパーティーにも祝福を'
      }
    },
    methods: {
      back() {
        this.$router.push('documents')
      },
      copyTitle() {
        clipboard.writeText(this.msg || this.msgPlaceholder)
        this.open = false
      }
    },
    mounted() {
      this.trigger = this.$refs['button'].$el
    },
    props: {
      msg: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="stylus">
  $nav-height = 60px
  $nav-button-width = 60px

  .sc-nav
    width 100%
    height $nav-height
    grid-column 1 / 4
    background-color #f3f3f3
    display grid
    grid-template-columns $nav-button-width 1fr $nav-button-width
    justify-content center
    .sc-nav-back
      width $nav-button-width
      height $nav-height
      text-align center
      cursor pointer
      transition 0.3s
      &:hover
        background-color #ccc
    .sc-nav-title-container
      overflow hidden
      .sc-nav-title
        text-align center
        line-height $nav-height
        font-size 16px
    .sc-nav-title-actions
      .sc-nav-title-button
        background transparent
        color #333
        box-shadow none
        height $nav-height
        width $nav-button-width
        min-width $nav-button-width
        line-height inherit
        border-radius 0
        transition 0.3s
        &:hover
          background-color #ccc

  .mu-list
    padding 0
    background-color #fff
    .sc-nav-title-more-btn
      .mu-item
        height 52px
        .mu-item-title
          text-align right
      
</style>
