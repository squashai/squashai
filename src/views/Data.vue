<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex sm12>
        <v-card flat>
          <v-card-title>
            <h1>Datasets</h1>
          </v-card-title>
          <v-card-text>
            <p>
              Datasets created with the
              SQUASH<span class="font-weight-bold">AI</span> label editor
              are currently distributed in the
              <a href="https://github.com/squashai/datasets" target="blank">
                <span>squashai/datasets</span>
              </a>
              GitHub project.
            </p>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md3 d-flex>
        <v-card flat>
          <v-card-title>
            <h2>Summary</h2>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-list dense>
              <v-list-tile>
                <v-list-tile-content>Total projects:</v-list-tile-content>
                <v-list-tile-content class="align-end">
                  {{ projects && projects.length || 0 }}
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Total labels:</v-list-tile-content>
                <v-list-tile-content class="align-end">
                  {{ total }}
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Action labels:</v-list-tile-content>
                <v-list-tile-content class="align-end">
                  {{ actions }}
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Replay labels:</v-list-tile-content>
                <v-list-tile-content class="align-end">
                  {{ replays }}
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md3 d-flex>
        <v-card flat>
          <v-card-title>
            <h2>Player Names</h2>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-list dense>
              <v-list-tile
                v-for="(num, name) in names"
                :key="name">
                <v-list-tile-content>{{ name }}:</v-list-tile-content>
                <v-list-tile-content class="align-end">
                  {{ num }}
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md3 d-flex>
        <v-card flat>
          <v-card-title>
            <h2>Shirt Colors</h2>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-list dense>
              <v-list-tile
                v-for="(num, color) in colors"
                :key="color">
                <v-list-tile-content>
                  <span>
                    <v-icon class="box" :color="color">stars</v-icon>
                  </span>
                </v-list-tile-content>
                <v-list-tile-content class="align-end">
                  {{ num }}
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md3 d-flex>
        <v-card flat>
          <v-card-title>
            <h2>Court Coverage</h2>
          </v-card-title>
          <v-divider></v-divider>
          <v-img
            class="white--text"
            :src="parquet">
            <table>
              <tr
                v-for="(row, i) in coverage"
                :key="i">
                <td
                  class="font-weight-bold"
                  v-for="(val, j) in row"
                  :key="j">
                  {{ val }}
                </td>
              </tr>
            </table>
          </v-img>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import config from '../../config'
import _ from 'lodash'
import parquet from '../assets/ground.png'

export default {

  data() {
    return {
      projects: null,
      parquet
    }
  },
  computed: {
    total() {
      return _.reduce(this.projects, (sum, project) => {
        return sum + project.labels.length
      }, 0)
    },
    actions() {
      return _.reduce(this.projects, (sum, project) => {
        return sum + _.reduce(project.labels, (sum, label) => {
          return sum + (label.action ? 1 : 0)
        }, 0)
      }, 0)
    },
    replays() {
      return _.reduce(this.projects, (sum, project) => {
        return sum + _.reduce(project.labels, (sum, label) => {
          return sum + (label.replay ? 1 : 0)
        }, 0)
      }, 0)
    },
    names() {
      const names = {}
      _.each(this.projects, (project) => {
        _.each(project.labels, (label) => {
          _.each(label.players, (player) => {
            if (player.visible) {
              names[player.name] = (names[player.name] || 0) + 1
            }
          })
        })
      })

      return names
    },
    colors() {
      const colors = {}
      _.each(this.projects, (project) => {
        _.each(project.labels, (label) => {
          _.each(label.players, (player) => {
            if (player.visible) {
              colors[player.color] = (colors[player.color] || 0) + 1
            }
          })
        })
      })

      return colors
    },
    coverage() {
      const steps = 5
      const width = 6.4
      const length = 9.75
      const zones = _.times(steps, () => {
        return _.times(steps, () => {
          return 0
        })
      })

      _.each(this.projects, (project) => {
        _.each(project.labels, (label) => {
          _.each(label.players, (player) => {
            if (player.visible) {
              const i = Math.floor((player.x + width / 2) / (width / steps))
              const j = Math.floor((player.y + length / 2) / (length / steps))
              zones[steps - i - 1][j] += 1
            }
          })
        })
      })

      return zones;

    }
  },
  async mounted() {
    const response = await fetch(config.datasetListUrl)
    const list = await response.json()
    const files = _.filter(list, (f) => {
      return f.name.match(/\.json$/)
    })
    
    const responses = await Promise.all(_.map(files, (f) => {
      return fetch(f.download_url)
    }))

    this.projects = await Promise.all(_.map(responses, (r) => {
      return r.json()
    }))

  } 
}
</script>
<style>
.box {
    border: 1px solid black;
}

table {
    width: 100%;
    height: 100%;
    border: 1px solid black;
    text-align: center;
}

td {
    width: 20%;
}

</style>
