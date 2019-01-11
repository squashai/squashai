<template>
  <v-app>
    <transition name="bounce">
      <toolbar
        v-if="$route.name !== 'edit'"
        :locations="locations">
      </toolbar>
    </transition>
    <v-content>
      <router-view/>
    </v-content>
    <transition name="bounce">
      <v-footer
        v-show="$route.name !== 'edit'">
        <a href="https://medium.com">Blog</a>
      </v-footer>
    </transition>
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
      hide: false,
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
<style>
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
