<template>
  <mu-drawer :open.sync="open" docked :z-depth="4" width="360" :right="true">
    <!-- <mu-paper :z-depth="1" class="list-wrap"> -->
      <mu-appbar :z-depth="2" color="purple">
        <mu-button icon slot="left" :ripple="false">
          <mu-icon value="build"></mu-icon>
        </mu-button>
        {{ $t('settings.setting') }}
      </mu-appbar>
      <mu-list>
          <mu-sub-header>{{ $t('settings.controlSetting') }}</mu-sub-header>
          <mu-list-item :ripple="false">
            <mu-list-item-title>
              {{ $t('settings.scrollMouse') }}
            </mu-list-item-title>
            <mu-list-item-action>
              <mu-select solo v-model="scrollMouse" full-width>
                <mu-option :label="$t('settings.page')" value="page"></mu-option>
                <mu-option :label="$t('settings.scale')" value="scale"></mu-option>
              </mu-select>
            </mu-list-item-action>
          </mu-list-item>
          <mu-list-item :ripple="false">
            <mu-list-item-title>
              {{ $t('settings.scrollAltMouse') }}
            </mu-list-item-title>
            <mu-list-item-action>
              <mu-select solo v-model="scrollAltMouse" readonly full-width>
                <mu-option :label="$t('settings.page')" value="page"></mu-option>
                <mu-option :label="$t('settings.scale')" value="scale"></mu-option>
              </mu-select>
            </mu-list-item-action>
          </mu-list-item>
          <mu-list-item>
            <mu-list-item-title>
              {{ $t('settings.bossKey') }}
            </mu-list-item-title>
            <mu-list-item-action>
              <mu-flex justify-content="center">
                <mu-badge class="key-badge" v-if="bossKey.ctrl" content="Ctrl"></mu-badge>
                <mu-badge class="key-badge" v-if="bossKey.alt" content="Alt"></mu-badge>
                <mu-badge class="key-badge" v-if="bossKey.shift" content="Shift"></mu-badge>
              </mu-flex>
            </mu-list-item-action>
          </mu-list-item>
        </mu-list>
        
      <mu-divider></mu-divider>

      <mu-list>
        <mu-sub-header>{{ $t('settings.displaySetting') }}</mu-sub-header>
        <mu-list-item button :ripple="false" @click="scrollHorizontal = !scrollHorizontal">
          <mu-list-item-title>
            {{ $t('settings.scrollDirection') }}
          </mu-list-item-title>
          <mu-list-item-action>
            <mu-switch v-model="scrollHorizontal" readonly></mu-switch>
          </mu-list-item-action>
        </mu-list-item>
        <mu-list-item :ripple="false">
          <mu-list-item-title>
            {{ $t('settings.scaleSize') }}
          </mu-list-item-title>
            <mu-slider class="scale-size-slider" :max="10" :min="-10" display-value :step="0.1" v-model="scaleSize"></mu-slider>
        </mu-list-item>
      </mu-list>

      <mu-divider></mu-divider>

      <mu-list>
        <mu-list-item button>
          <mu-list-item-action>
            <mu-icon color="blue" value="check_circle"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>{{ $t('general.save') }}</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button>
          <mu-list-item-action>
            <mu-icon color="gray" value="remove_circle"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>{{ $t('general.cancel') }}</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button>
          <mu-list-item-action>
            <mu-icon color="orange" value="refresh"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>{{ $t('general.default') }}</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    <!-- </mu-paper> -->
  </mu-drawer>
</template>

<script>
const setting = {
  open: false,
  bossKey: {
    ctrl: true,
    alt: false,
    shift: false,
    key: 'esc'
  },
  scrollMouse: 'page',
  scrollHorizontal: false,
  scaleSize: 1.0
}

window.setting = setting

export default {
  computed: {
    scrollAltMouse () {
      if (this.scrollMouse === 'page') {
        return 'scale'
      } else {
        return 'page'
      }
    },
    scrollDirection () {
      return this.scrollHorizontal ? 'horizontal' : 'vertical'
    },
    keyStr () {
      let keys = []
      if (this.bossKey.ctrl) {
        keys.push('Ctrl')
      }
      if (this.bossKey.alt) {
        keys.push('Alt')
      }
      if (this.bossKey.shift) {
        keys.push('Shift')
      }
      keys.push(this.bossKey.key)
      return keys.join('+')
    }
  },
  method: {
    startKeyListen () {},
    stopKeyListen () {}
  },
  data () {
    return setting
  }
}
</script>

<style lang="stylus" scoped>
.list-wrap
  width: 360px
  overflow: hidden

.scale-size-slider
  margin-bottom: 0

.key-badge
  margin-left: 8px
</style>
