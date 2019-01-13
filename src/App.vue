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
        <div class="px-3">
          Squash<span class="font-weight-bold">AI</span> is in its
          very initial stage; reach out through
          <a href="https://github.com/squashai/squashai/issues" target="blank">
            <span>GitHub issues</span>
          </a>
          if you want to share ideas.
        </div>
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
