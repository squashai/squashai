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
        name: 'About',
        to: '/about'
      }, {
        name: 'GitHub',
        href: 'https://github.com/squashai/squashai',
        target: '_blank'
      }]
    }
  }
}
</script>
