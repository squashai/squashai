<template>
  <v-container fluid>
    <v-layout justify-between>
      <v-flex xs6 md4>
        <player
          v-model="players[1]"
          label="Player 1"/>
      </v-flex>
      <v-flex xs6 md4>
        <player
          v-model="players[2]"
          label="Player 2"/>
      </v-flex>
    </v-layout>
    <v-layout row wrap align-end class="pa-0">
      <v-flex xs12 md8>
        <v-card>
          <vue-plyr
            ref="video"
            :options="options">
            <video>
              <source
                src="https://gitlab.com/squashai/media/raw/master/ohtRSiQ-HPg.mp4"
                type="video/mp4">
            </video>
          </vue-plyr>
        </v-card>
      </v-flex>
      <v-flex xs12 md4>
        <v-layout column>
          <v-flex>
            <court
              v-model="players"
              :disabled="frozen">
            </court>
          </v-flex>
          <v-flex>
            <v-layout justify-center row>
              <v-btn
                small
                color="grey lighten-3"
                class="mb-0"
                @click="prev()"
                :disabled="first">
                <v-icon>fast_rewind</v-icon>
              </v-btn>
              <v-btn
                small
                color="grey lighten-3"
                class="mb-0"
                @click="next()"
                :disabled="last">
                <v-icon>fast_forward</v-icon>
              </v-btn>
            </v-layout>
          </v-flex>
          <v-flex>
            <v-layout justify-center row>
              <v-btn
                small
                color="grey lighten-3"
                class="mb-0"
                @click="toggle()"
                :depressed="!!current">
                Label
              </v-btn>
              <v-btn
                small
                color="grey lighten-3"
                class="mb-0"
                disabled>
                Replay
              </v-btn>
              <v-btn
                small
                color="grey lighten-3"
                class="mb-0"
                disabled>
                Action
              </v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { VuePlyr } from 'vue-plyr'
import _ from 'lodash'
import Court from '../components/Court'
import Player from '../components/Player'

export default {
  components: {
    Court,
    Player,
    VuePlyr
  },
  data() {
    return {
      frozen: false,
      options: {
        seekTime: 0.5,
        invertTime: false,
        controls: [
          'play', 'rewind', 'fast-forward', 'progress', 'current-time',
          'mute', 'volume'
        ]
      },
      players: {
        1: {
          name: null,
          color: '#FFFFFF',
          x: -2,
          y: -2,
          visible: true
        },
        2: {
          name: null,
          color: '#000000',
          x: 2,
          y: -2,
          visible: true
        }
      },
      time: 0,
      labels: []
    }
  },
  computed: {
    video() {
      return this.$refs.video.player
    },
    first() {
      return (this.labels.length === 0 ||
              this.time <= this.labels[0].time)
    },    
    last() {
      return (this.labels.length === 0 ||
              this.time >= this.labels[this.labels.length - 1].time)
    },
    current() {
      const time = this.time
      const labels = this.labels
      return _.find(labels, { time })
    }
  },
  methods: {
    next() {
      const label = _.find(this.labels, (l) => {
        return l.time > this.time
      })
      if (label) {
        this.video.currentTime = label.time
        this.players = label.players
      }
    },
    prev() {
      const label = _.findLast(this.labels, (l) => {
        return l.time < this.time
      })
      if (label) {
        this.video.currentTime = label.time
        this.players = label.players
      }
    },
    toggle() {
      // Using splice for array manipulation as lodash does not seem
      // to trigger updates on computed properties
      
      if (this.current) {
        this.labels.splice(_.findIndex(this.labels, {
          time: this.time
        }), 1)
      } else {
        const val = {
          time: this.time,
          players: _.cloneDeep(this.players)
        }
        this.labels.splice(_.sortedIndexBy(this.labels, val, 'time'), 0, val)
      }
    }
  },
  mounted() {
    this.video.on('timeupdate', () => {
      this.time = this.video.currentTime
    })
  }
}
</script>
<style scoped>
video {
    width: 100%;
}
</style>
