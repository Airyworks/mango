<template>
  <div class="sc-nav" name="nav">
    <div class="sc-nav-back" @click="back">
      <mu-icon class="sc-nav-icon" value="keyboard_arrow_left"></mu-icon>
    </div>
    <div class="sc-nav-title-container">
      <!-- <mu-tooltip :content="msgAlt">
        <p class="sc-nav-title">{{ msg || msgPlaceholder }}</p>
      </mu-tooltip> -->
        <p class="sc-nav-title">{{ msg || msgPlaceholder }}</p>
    </div>
    <div class="sc-nav-title-actions">
      <mu-button class="sc-nav-title-button" ref="button" small color="primary" @click="open = !open">
        <mu-icon class="sc-nav-icon" value="more_horiz"></mu-icon>
      </mu-button>
      
      <mu-popover cover :open.sync="open" :trigger="trigger" placement="bottom-end">
        <mu-list>
          <mu-list-item button class="sc-n xv-title-more-btn" ref="copy" @click="copyTitle">
            <mu-list-item-title>
              <mu-icon class="sc-nav-ionicons" value=":ion ion-md-copy"></mu-icon>
            </mu-list-item-title>
          </mu-list-item>
          <mu-list-item button class="sc-nav-title-more-btn">
            <mu-list-item-title>
              <mu-icon value="star_border"></mu-icon>
            </mu-list-item-title>
          </mu-list-item>
          <!-- <mu-list-item button class="sc-nav-title-more-btn">
            <mu-list-item-title>
              <mu-icon value="delete_forever"></mu-icon>
            </mu-list-item-title>
          </mu-list-item> -->
        </mu-list>
      </mu-popover>
    </div>
  </div>
</template>

<script>
  import { clipboard } from 'electron'

  export default {
    name: 'Nav',
    data() {
      return {
        open: false,
        trigger: null,
        msgPlaceholder: '[NO TITLE]'
      }
    },
    methods: {
      back() {
        this.$router.push('documents')
      },
      copyTitle() {
        clipboard.writeText(this.filePath || this.msg || this.msgPlaceholder)
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
      },
      filePath: {
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
    .sc-nav-icon
      font-size 30px
      line-height 60px
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
    .mu-item
      height 52px
      .mu-item-title
        text-align center
        .sc-nav-ionicons
          font-size 22px
      
</style>
