<template>
  <v-container fluid>
    <v-toolbar>
      <v-toolbar-title>
        {{ source.title }}
      </v-toolbar-title>
    </v-toolbar>
    <v-layout justify-between>
      <v-flex xs6 md4>
        <player
          v-model="players[1]"
          label="Player 1"
          :disabled="!!current"/>
      </v-flex>
      <v-flex xs6 md4>
        <player
          v-model="players[2]"
          label="Player 2"
          :disabled="!!current"/>
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
                :src="source.url"
                :type="source.type">
            </video>
          </vue-plyr>
        </v-card>
      </v-flex>
      <v-flex xs12 md4>
        <v-layout column>
          <v-flex>
            <v-layout justify-center row>
              <div class="mr-5">
                <v-switch
                  v-model="action"
                  label="Action"
                  :disabled="!!current">
                </v-switch>
              </div>
              <div>
                <v-switch
                  v-model="replay"
                  label="Replay"
                  :disabled="!!current">
                </v-switch>
              </div>
            </v-layout>
          </v-flex>
          <v-flex>
            <court
              v-model="players"
              :disabled="!!current">
            </court>
          </v-flex>
          <v-flex>
            <v-layout align-center row>
              <v-btn
                @click="toggle"
                :color="current ? 'primary' : undefined"
                icon>
                <v-icon>label</v-icon>
              </v-btn>
              <v-btn
                @click="prev"
                :disabled="first"
                icon>
                <v-icon>fast_rewind</v-icon>
              </v-btn>
              <v-btn
                @click="next"
                :disabled="last"
                icon>
                <v-icon>fast_forward</v-icon>
              </v-btn>
              <v-slider
                class="mx-2"
                :min="labels.length > 0 ? 1 : 0"
                :max="labels.length"
                v-model="position"
                disabled>
              </v-slider>
              <span class="grey--text">
                {{ current ? position : '-' }}/{{ labels.length }}
              </span>
              <v-btn
                @click="save"
                :disabled="labels.length === 0"
                icon>
                <v-icon>get_app</v-icon>
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
  props: {
    source: {
      type: Object,
      default() {
        return {
          name: 'ohtRSiQ-HPg.mp4',
          title: 'Squash: Men\'s Round 3 Roundup - Hong Kong Open 2018',
          url: 'https://gitlab.com/squashai/media/raw/master/ohtRSiQ-HPg.mp4',
          type: 'video/mp4'
        }
      }
    },
    restored: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
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
      action: false,
      replay: false,
      labels: _.cloneDeep(this.restored)
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
      return _.find(this.labels, {
        time: this.time
      })
    },
    position() {
      const idx = _.findIndex(this.labels, (l) => {
        return l.time >= this.time
      })

      return (idx >= 0 ? idx + 1 : this.labels.length)
    }
  },
  methods: {
    next() {
      const label = _.find(this.labels, (l) => {
        return l.time > this.time
      })
      if (label) {
        this.video.currentTime = label.time
      }
    },
    prev() {
      const label = _.findLast(this.labels, (l) => {
        return l.time < this.time
      })
      if (label) {
        this.video.currentTime = label.time
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
          action: this.action,
          replay: this.replay,
          players: _.cloneDeep(this.players)
        }
        this.labels.splice(_.sortedIndexBy(this.labels, val, 'time'), 0, val)
      }
    },
    save() {
      const blob = new Blob([JSON.stringify({
        source: this.source,
        labels: this.labels
      }, null, '  ')], {
        "type": "application/json"
      })
      const a = document.createElement("a")
      const flds = this.source.name.match(/[^.]+/)
      a.download = `${flds ? flds[0] : 'project'}.json`
      a.href = URL.createObjectURL(blob)
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  },
  watch: {
    current() {
      if (this.current) {
        this.players = _.cloneDeep(this.current.players)
        this.action = this.current.action
        this.replay = this.current.replay
      }
    }
  },
  mounted() {
    this.video.on('timeupdate', () => {
      this.time = this.video.currentTime
    })

    if (this.current) {
      this.players = _.cloneDeep(this.current.players)
    }
  }
}
</script>
<style scoped>
video {
    width: 100%;
}
</style>
