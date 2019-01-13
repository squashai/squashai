<template>
  <v-card
    @click="launch">
    <v-img :src="thumbnail"></v-img>
    <v-card-title primary-title>
      <div>{{ title }}</div>
    </v-card-title>
  </v-card>
</template>
<script>
export default {
  props: {
    thumbnail: {
      type: String,
      default() {
        return 'https://img.youtube.com/vi/F6UG6SZNdEY/mqdefault.jpg'
      }
    },
    name: {
      type: String,
      default() {
        return 'F6UG6SZNdEY.mp4'
      }
    },
    title: {
      type: String,
      default() {
        return 'WE\'RE NOT DONE YET!" - Free Game Friday - ' +
          'Rodriguez v Rösner - Hong Kong 2018'
      }
    },
    url: {
      type: String,
      default() {
        return 'https://gitlab.com/squashai/media/raw/master/F6UG6SZNdEY.mp4'
      }
    },
    type: {
      type: String,
      default() {
        return 'video/mp4'
      }
    }
  },
  methods: {
    launch() {
      this.$router.push({
        name: 'edit',
        params: {
          source: {
            name: this.name,
            title: this.title,
            url: this.url,
            type: this.type
          }
        }
      })
    }
  }
}
</script>
<style>

</style>
