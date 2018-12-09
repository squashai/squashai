<template>
  <div>
    <v-navigation-drawer
      absolute
      temporary
      app
      v-model="drawer">
      <v-list>
        <v-list-tile
          to="/">
          <v-list-tile-content>
            <v-list-tile-title>
              Home
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-for="location in locations"
          :key="location.name"
          :to="location.to"
          :href="location.href"
          :target="location.target">
          <v-list-tile-content>
            <v-list-tile-title>
              {{ location.name }}
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
        <v-btn
          flat
          class="headline"
          active-class=""
          to="/">
          <span class="font-weight-light">Squash</span>
          <span>AI</span>
        </v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items
        class="hidden-sm-and-down"
        v-for="location in locations"
        :key="location.name">
        <v-btn
          flat
          :to="location.to"
          :href="location.href"
          :target="location.target">
          {{ location.name }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>
<script>
export default {
  props: [
    'locations'
  ],
  data() {
    return {
      drawer: false
    }
  }
}
</script>
