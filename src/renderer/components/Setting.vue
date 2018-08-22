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
              <mu-flex inline align-content="between">
                <mu-badge class="key-badge" v-if="bossKey.ctrl" content="CTRL"></mu-badge>
                <mu-badge class="key-badge" v-if="bossKey.alt" content="ALT"></mu-badge>
                <mu-badge class="key-badge" v-if="bossKey.shift" content="SHIFT"></mu-badge>
                <mu-badge class="key-badge" v-if="!! bossKey.key" :content="bossKey.key"></mu-badge>
                <!-- <mu-badge class="key-badge" v-if="bossKey.shift" >
                  <mu-icon value="keyboard" style="font-size: 16px;" slot="content"></mu-icon>
                </mu-badge> -->
                <mu-button color="gray" v-loading="isListening" @click="startKeyListen" icon small>
                  <mu-icon value="keyboard"></mu-icon>
                </mu-button>
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
import hotkeys from 'hotkeys-js'
const setting = {
  open: false,
  isListening: false,
  bossKey: {
    ctrl: true,
    alt: false,
    shift: false,
    key: 'Escape'
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
    }
  },
  methods: {
    startKeyListen () {
      this.$toast.info({
        message: this.$t('')
      })
      this.isListening = true
      hotkeys('*', e => {
        e.preventDefault()
        this.bossKey.shift = hotkeys.shift
        this.bossKey.ctrl = hotkeys.ctrl || hotkeys.control
        this.bossKey.alt = hotkeys.alt
        this.bossKey.key = ['Control', 'Alt', 'Shift'].includes(e.key) ? '' : e.key.toUpperCase()
      })
      window.addEventListener('keyup', this.keyupHandler)
    },
    stopKeyListen () {
      hotkeys.unbind('*')
      window.removeEventListener('keyup', this.keyupHandler)
      this.isListening = false
    },
    keyupHandler (e) {
      e.preventDefault()
      if (hotkeys.getPressedKeyCodes().length === 0) {
        this.stopKeyListen()
      }
    },
    close () {
      this.open = false
    }
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
  margin: 8px 8px 0 0

</style>
