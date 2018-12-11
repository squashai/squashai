<template>
  <v-app>
    <toolbar
      :locations="locations">
    </toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer>
      <a href="https://medium.com">Blog</a>
    </v-footer>
  </v-app>
</template>
<script>
import Toolbar from './components/Toolbar.vue'

export default {
  name: 'app',
  components: {
    Toolbar
  },
  data () {
    return {
      locations: [{
        name: 'Editor',
        to: '/editor'
      }, {
        name: 'Data',
        to: '/data'
      }, {
        name: 'GitHub',
        href: 'https://github.com/squashai',
        target: '_blank'
      }]
    }
  }
}
</script>
