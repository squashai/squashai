<template>
  <v-app>
    <v-navigation-drawer persistent
                         absolute
                         fixed
                         app
                         v-model="drawer">
      <v-list>
        <v-list-tile to="/">
          <v-list-tile-content>
            <v-list-tile-title>
              Home
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/about">
          <v-list-tile-content>
            <v-list-tile-title>
              About
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          href="https://github.com"
          target="_blank">
          <v-list-tile-content>
            <v-list-tile-title>
              GitHub
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    
    <v-toolbar app>
      <v-toolbar-side-icon
        class="hidden-md-and-up"
        @click.stop="drawer = !drawer">
      </v-toolbar-side-icon>
      <v-toolbar-title class="headline text-uppercase">
        <v-btn flat
               class="headline"
               active-class=""
               to="/">
          <span class="font-weight-light">Squash</span>
          <span>AI</span>
        </v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/about">About</v-btn>
        <v-btn flat
               href="https://github.com"
               target="_blank">
          <span class="mr-2">GITHUB</span>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
    <v-footer>
      <a href="https://medium.com">Blog</a>
    </v-footer>
  </v-app>
</template>
<script>
export default {
  data () {
    return {
      drawer: false
    }
  }
}
</script>
