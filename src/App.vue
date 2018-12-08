<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title
        class="headline text-uppercase">
        <!-- <router-link to="/"> -->
        <!-- </router-link> -->
        <v-btn flat
               class="display-1"
               active-class=""
               to="/">
          <span class="font-weight-light">Squash</span>
          <span>AI</span>
        </v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat to="/about">About</v-btn>
      <v-btn flat
             href="https://github.com"
             target="_blank">
        <span class="mr-2">GITHUB</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
    <v-footer>
      <a href="https://medium.com">Blog</a>
    </v-footer>
  </v-app>
</template>
