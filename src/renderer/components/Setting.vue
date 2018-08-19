<template>
  <mu-drawer :open.sync="open" :docked="docked" :right="right">
    <mu-list>
      <mu-list-item button>
        <mu-list-item-title>{{ $t('settings.scrollMouse') }}</mu-list-item-title>
      </mu-list-item>
      <mu-list-item button>
        <mu-list-item-title>Menu Item 2</mu-list-item-title>
      </mu-list-item>
      <mu-list-item  @click="open = false" button>
        <mu-list-item-title>Close</mu-list-item-title>
      </mu-list-item>
    </mu-list>
  </mu-drawer>
</template>

<script>
window.setting = {
  docked: false,
  open: false,
  right: true
}
export default {
  data () {
    return window.setting
  }
}
</script>

<style lang="stylus" scoped>

</style>
