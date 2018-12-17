<template>
  <v-container class="pa-0" fluid>
    <v-layout row wrap align-center>
      <v-flex xs12 md6>
        <video width="640" height="480">
          <source
            src="https://gitlab.com/squashai/media/raw/master/ohtRSiQ-HPg.mp4"
            type="video/mp4">
        </video>
      </v-flex>
      <v-flex xs12 md4>
        <court v-model="players"></court>
      </v-flex>
    </v-layout>
    <v-btn
      @click="players[1].dark = !players[1].dark"
      :dark="players[1].dark">
      Player 1
    </v-btn>
    <v-btn
      @click="players[2].dark = !players[2].dark"
      :dark="players[2].dark">
      Player 2
    </v-btn>
  </v-container>
</template>
<script>
import Court from '../components/Court'

export default {
  components: {
    Court
  },
  data() {
    return {
      players: {
        1: {
          x: -2,
          y: -2,
          dark: false,
        },
        2: {
          x: 2,
          y: -2,
          dark: true,
        }
      }
    }
  }
}
</script>
<style>
video {
    width: 100%;
}
</style>
