<template>
  <v-container fluid grid-list-sm>
    <v-layout row wrap>
      <v-flex
        xs6 sm4 d-flex
        v-for="video in list"
        :key="video.url">
        <thumbnail
          :thumbnail="video.thumbnail"
          :title="video.title"
          :url="video.url">
        </thumbnail>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import config from '../../config'
import Thumbnail from '../components/Thumbnail.vue'

export default {
  data() {
    return {
      list: null
    }
  },
  components: {
    Thumbnail
  },
  methods: {

  },
  async mounted() {
    const res = await fetch(config.videoListUrl)
    this.list = await res.json()
  }
}
</script>
