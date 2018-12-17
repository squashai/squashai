<template>
  <canvas
    width="400"
    height="300"
    touch-action="none"
    ref="canvas">
  </canvas>
</template>
<script>
import { Engine, Scene, FreeCamera, HemisphericLight, DirectionalLight,
         MeshBuilder, StandardMaterial, Texture, ShadowGenerator,
         PointerDragBehavior, Vector3, Color3, Color4, } from 'babylonjs'
import _ from 'lodash'
import parquet from '../assets/ground.png'

const dimensions = {
  court: {
    width: 6.4,
    length: 9.75
  },
  players: {
    radius: 0.5
  }
}

export default {
  name: 'Court',
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          1: {
            x: -2,
            y: -2,
            dark: false
          },
          2: {
            x: 2,
            y: -2,
            dark: true
          }
        }
      }
    }
  },
  data() {
    return {
      scene: null,
      engine: null,
      camera: null,
      lights: null,
      ground: null,
      players: null,
      refresh: true
    }
  },
  watch: {
    value: {
      deep: true,
      handler() {
        this.players[1].position.x = this.value[1].x
        this.players[1].position.z = this.value[1].y
        this.players[2].position.x = this.value[2].x
        this.players[2].position.z = this.value[2].y
        this.players[1].material.diffuseColor = (this.value[1].dark ?
                                                 new Color3(0, 0, 0) :
                                                 new Color3(1, 1, 1))
        this.players[2].material.diffuseColor = (this.value[2].dark ?
                                                 new Color3(0, 0, 0) :
                                                 new Color3(1, 1, 1))
        this.refresh = true
      }
    }
  },
  methods: {
    resize() {
      this.engine.resize()
      this.refresh = true
    },
    createCamera() {
      const camera = new FreeCamera("camera", new Vector3(0, 5, -8.2),
                                    this.scene)
      camera.setTarget(new Vector3(0, 0, -2))
      return camera
    },
    createLights() {
      const hemispheric = new HemisphericLight("hlight", new Vector3(0, 1, 0),
                                               this.scene)
      hemispheric.intensity = 0.4

      const directional = new DirectionalLight("dlight", new Vector3(0,-1, 0),
                                       this.scene)
      directional.position = new Vector3(0, 5, 0)
      directional.intensity = 0.9

      return {
        hemispheric,
        directional
      }      
    },
    createGround() {
      const ground = MeshBuilder.CreateGround("ground1", {
        width: dimensions.court.width,
        height: dimensions.court.length
      }, this.scene)

      const material = new StandardMaterial("ground", this.scene)
      material.diffuseTexture = new Texture(parquet, this.scene)
      material.diffuseTexture.onLoadObservable.add(() => {
        this.refresh = true
      })
      material.specularColor = new Color3(0, 0, 0)
      ground.material = material
      ground.receiveShadows = true
      return ground
    },
    createPlayer(name, specs) {
      const player = MeshBuilder.CreateDisc(name, {
        radius: dimensions.players.radius
      }, this.scene)
      player.rotation.x = Math.PI / 2
      player.position.y = 0.1
      player.position.x = specs.x
      player.position.z = specs.y

      player.material = new StandardMaterial(`${name}Material`, this.scene)
      player.material.diffuseColor = (specs.dark ?
                                      new Color3(0, 0, 0) :
                                      new Color3(1, 1, 1))

      const behavior = new PointerDragBehavior({
        dragPlaneNormal: new Vector3(0,1,0)
      })
      behavior.useObjectOrienationForDragging = false
      behavior.updateDragPlane = true

      player.addBehavior(behavior)

      behavior.onDragStartObservable.add(() => {
        this.refresh = true
      })

      behavior.onDragObservable.add(() => {
        this.refresh = true
      })

      behavior.onDragEndObservable.add(() => {
        const w = dimensions.court.width / 2 - dimensions.players.radius,
              l = dimensions.court.length / 2 - dimensions.players.radius
        player.position.x = Math.max(-w, Math.min(w, player.position.x))
        player.position.z = Math.max(-l, Math.min(l, player.position.z))
        this.refresh = true
        this.notify()
      })
      return player
    },
    notify() {
      this.$emit('input', _.defaultsDeep({
        1: {
          x: this.players[1].position.x,
          y: this.players[1].position.z
        },
        2: {
          x: this.players[2].position.x,
          y: this.players[2].position.z
        }
      }, this.value))
    }
  },
  mounted() {

    this.engine = new Engine(this.$el, true)
    this.scene = new Scene(this.engine)
    this.scene.clearColor = new Color4(0, 0, 0, 0)

    this.camera = this.createCamera()
    this.lights = this.createLights()
    this.ground = this.createGround()
    this.players = {
      1: this.createPlayer('player1', this.value[1]),
      2: this.createPlayer('player2', this.value[2])
    }

    const generator = new ShadowGenerator(1024, this.lights.directional)
    generator.useExponentialShadowMap = true
    generator.addShadowCaster(this.players[1])
    generator.addShadowCaster(this.players[2])

    this.engine.runRenderLoop(() => { 
      if (this.refresh) {
        this.scene.render()
        this.refresh = false
      }
    })

    window.addEventListener("resize", this.resize)

  },
  destroyed() {
    window.removeEventListener("resize", this.resize)
  }
}
</script>
<style>
canvas {
    margin: 5%;
    width: 90%;
    outline: none;
    /* border: solid black 1px; */
}
</style>
