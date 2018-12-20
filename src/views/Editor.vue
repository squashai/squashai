<template>
  <v-container fluid>
    <v-layout justify-between>
      <v-flex xs6 md4>
        <player
          v-model="players[1]"
          label="Player 1"/>
      </v-flex>
      <v-flex xs6 md4>
        <player
          v-model="players[2]"
          label="Player 2"/>
      </v-flex>
    </v-layout>
    <v-layout row wrap align-center  class="pa-0">
      <v-flex xs12 md6>
        <vue-plyr
          :options="options">
          <video>
            <source
              src="https://gitlab.com/squashai/media/raw/master/ohtRSiQ-HPg.mp4"
              type="video/mp4">
          </video>
        </vue-plyr>
      </v-flex>
      <v-flex xs12 md4>
        <court v-model="players"></court>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { VuePlyr } from 'vue-plyr'
import Court from '../components/Court'
import Player from '../components/Player'

export default {
  components: {
    Court,
    Player,
    VuePlyr
  },
  data() {
    return {
      options: {
        seekTime: 0.5,
        controls: [
          'play', 'rewind', 'fast-forward', 'progress', 'current-time',
          'mute', 'volume'
        ]
      },
      players: {
        1: {
          name: null,
          color: '#FFFFFF',
          x: -2,
          y: -2,
          visible: true
        },
        2: {
          name: null,
          color: '#000000',
          x: 2,
          y: -2,
          visible: true
        }
      }
    }
  }
}
</script>
<style scoped>
video {
    width: 100%;
}
</style>
