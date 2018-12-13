<template>
  <v-container class="pa-0" fluid>
    <v-layout row wrap>
      <v-flex xs12 md6>
        <video width="640" height="480">
          <source
            src="https://gitlab.com/squashai/media/raw/master/ohtRSiQ-HPg.mp4"
            type="video/mp4">
        </video>
      </v-flex>
      <v-flex xs12 md4>
        <court></court>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import Court from '../components/Court'

export default {
  components: {
    Court
  }
}
</script>
<style>
video {
    width: 100%;
}
</style>
