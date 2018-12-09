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
              create new ones by labeling players, actions and
              positions in professional games.
            </p>
          </v-flex>
          <v-flex xs12 sm4 md3>
            <div class="text-xs-center">
              <v-icon color="primary" size="60">video_library</v-icon>
            </div>
            <h3>AI in Action</h3>
            <p>
              Watch AI agents process actual games, recognize players and
              understand what happens on court.
            </p>
          </v-flex>
          <v-flex xs12 sm4 md3>
            <div class="text-xs-center">
              <v-icon color="primary" size="60">equalizer</v-icon>
            </div>
            <h3>Analysis</h3>
            <p>
              Visualize statistics derived from the automated analysis
              of real matches. Get insights such as how much <em>T
              domination</em> correlates with the final result.
            </p>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex class="pa-3">
        <v-card flat>
          <v-card-title>
            <h1>About
              <span class="font-weight-light">SQUASH</span>AI
            </h1>
          </v-card-title>
          <v-layout row justify-space-around>
            <v-flex sm12 md6>
              <v-card-text>
                <p>
                  Squash is a beautiful racket sport that is also very
                  well suited for video analysis based on Machine
                  Learning techniques. In its most common format, it
                  is played in a relatively small court by two players
                  that alternately hit the ball performing a limited
                  set of easily recognizable shots. Given the
                  contained size of the court, even professional
                  videos are recorded by a small number of fixed
                  cameras.
                </p>
                <p>
                  SQUASH<span class="font-weight-bold">AI</span>'s
                  goal is to build a bridge between the Machine
                  Learning and the Squash communities, to inspire
                  researchers and enable them to easily retrieve raw
                  material and pre-processed datasets to experiment
                  with.
                </p>
              </v-card-text>
            </v-flex>
            <v-flex sm12 md5>
              <v-img
                :src="require('../assets/canarywarf.png')"
                contain>
                </v-img>
            </v-flex>            
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
