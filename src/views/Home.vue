<template>
  <v-container class="pa-0" fluid>
    <v-layout column>
      <v-flex>
        <v-parallax
          :src="require('../assets/jumbotron.png')"
          height="300">
          <v-layout align-start justify-end column>
            <h2 class="font-weight-light black--text mb-3">
              Teaching Computers the Beauty of Squash
            </h2>
          </v-layout>
        </v-parallax>
      </v-flex>
      <v-flex>
        <v-layout row wrap justify-space-around
                  class="pa-3">
          <v-flex xs12 sm4 md3>
            <div class="text-xs-center">
              <v-icon color="primary" size="60">explore</v-icon>
            </div>
            <h3>Datasets</h3>
            <p>
              Explore existing datasets for training AI models and
              create your own ones by labeling players, actions and
              positions in actual games
            </p>
          </v-flex>
          <v-flex xs12 sm4 md3>
            <div class="text-xs-center">
              <v-icon color="primary" size="60">video_library</v-icon>
            </div>
            <h3>AI in Action</h3>
            <p>
              Watch AI agents analyze actual games
            </p>
          </v-flex>
          <v-flex xs12 sm4 md3>
            <div class="text-xs-center">
              <v-icon color="primary" size="60">equalizer</v-icon>
            </div>
            <h3>Analysis</h3>
            <p>
              Visualize statistics derived from the automated analysis
              of real matches
            </p>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex>
        <v-card flat>
          <v-card-title>
            <h1>About
              <span class="font-weight-light">SQUASH</span>AI
            </h1>
          </v-card-title>
          <v-layout row justify-space-around>
            <v-flex sm12 md5>
              <v-card-text>
                Loren ipsum Loren ipsum Loren ipsum Loren ipsum Loren ipsum
                Loren ipsum Loren ipsum Loren ipsum Loren ipsum Loren ipsum
                Loren ipsum Loren ipsum Loren ipsum Loren ipsum Loren ipsum
                Loren ipsum Loren ipsum Loren ipsum Loren ipsum Loren ipsum
                Loren ipsum Loren ipsum Loren ipsum Loren ipsum Loren ipsum
                Loren ipsum Loren ipsum Loren ipsum Loren ipsum Loren ipsum
                Loren ipsum Loren ipsum Loren ipsum Loren ipsum Loren ipsum
                Loren ipsum Loren ipsum Loren ipsum Loren ipsum Loren ipsum
              </v-card-text>
            </v-flex>
            <v-flex sm12 md5>
              <v-img
                :src="require('../assets/canarywarf.png')"
                height="250px"
                contain>
                </v-img>
            </v-flex>            
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
