<template>
  <v-text-field
    v-model="value.name"
    :label="label"
    type="text"
    :prepend-inner-icon="!!value.visible ? 'visibility' : 'visibility_off'"
    @click:prepend-inner="toggle"
    :disabled="disabled">
    <v-menu
      slot="append-outer"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y>
      <v-btn
        slot="activator"
        color="grey lighten-2"
        small
        icon>
        <v-icon :color="color.hex">person</v-icon>
      </v-btn>
      <compact
        v-model="color"
        :palette="palette"/>
    </v-menu>
  </v-text-field>
</template>
<script>
import { Compact } from 'vue-color'
import _ from 'lodash'

export default {
  name: 'player',
  components: {
    Compact
  },
  props: {
    value: {
      type: Object,
      default() {
        return {
          name: null,
          color: '#FFFFFF',
          visible: true
        }
      }
    },
    label: {
      type: String,
      default() {
        return null
      }
    },
    disabled: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      menu: false,
      palette: [
        '#FFFFFF', '#000000', '#9E9E9E', '#F44336', '#FF9800', '#FFEB3B',
        '#4CAF50', '#2196F3', '#3F51B5', '#9C27B0'
      ],
      color: {
        hex: this.value.color
      },
    }
  },
  watch: {
    'color.hex'() {
      this.$emit('input', _.defaultsDeep({
        color: this.color.hex
      }, this.value))
    },
    'value.color'() {
      this.color = {
        hex: this.value.color
      }
    }
  },
  methods: {
    toggle() {
      this.$emit('input', _.defaultsDeep({
        visible: !this.value.visible
      }, this.value))
    }
  }
}
</script>
<style scoped>
.vc-compact {
    width: 105px !important;
}
</style>
