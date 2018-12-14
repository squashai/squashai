<template>
  <canvas
    width="400"
    height="300"
    touch-action="none"
    ref="canvas">
  </canvas>
</template>
<script>
import * as BABYLON from 'babylonjs'
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
          x: 0,
          y: 0,
          dark: false,
          players: {
            1: {
              x: -2,
              y: -2,
              color: '#555555'
            },
            2: {
              x: 2,
              y: -2,
              color: '#555555'
            }
          }
        }
      }
    }
  },
  data() {
    return {
      scene: null,
      engine: null,
      disc: null,
      players: null,
      refresh: true
    }
  },
  watch: {
    'value.dark'() {
      // eslint-disable-next-line
      console.log('value.dark changed!')
      this.disc.material.diffuseColor = (this.value.dark ?
                                         new BABYLON.Color3(0, 0, 0) :
                                         new BABYLON.Color3(1, 1, 1))
      this.refresh = true
    }
  },
  methods: {
    resize() {
      this.engine.resize()
      this.refresh = true
    }
  },
  mounted() {

    this.engine = new BABYLON.Engine(this.$el, true)
    this.scene = new BABYLON.Scene(this.engine)
    this.scene.clearColor = new BABYLON.Color4(0, 0, 0, 0)

    
    const camera = new BABYLON.FreeCamera("camera",
                                          new BABYLON.Vector3(0, 5, -8.2),
                                          this.scene)

    camera.setTarget(new BABYLON.Vector3(0, 0, -2))

    const hemi = new BABYLON.HemisphericLight("light1",
                                              new BABYLON.Vector3(0, 1, 0),
                                              this.scene)
    hemi.intensity = 0.4

    const light = new BABYLON.DirectionalLight("dir01",
                                               new BABYLON.Vector3(0,-1, 0),
                                               this.scene)
    light.position = new BABYLON.Vector3(0, 5, 0);
    light.intensity = 0.9;

    const ground = BABYLON.MeshBuilder.CreateGround("ground1", {
      width: dimensions.court.width,
      height: dimensions.court.length
    }, this.scene)

    const material = new BABYLON.StandardMaterial("ground", this.scene)
    material.diffuseTexture = new BABYLON.Texture(parquet, this.scene)
    material.diffuseTexture.onLoadObservable.add(() => {
      this.refresh = true
    })
    material.specularColor = new BABYLON.Color3(0, 0, 0)
    ground.material = material

    this.disc = BABYLON.MeshBuilder.CreateDisc("disc1", {
      radius: dimensions.players.radius
    }, this.scene)
    this.disc.rotation.x = Math.PI / 2
    this.disc.position.y = 0.1
    this.disc.position.x = this.value.x
    this.disc.position.z = this.value.y

    this.disc.material = new BABYLON.StandardMaterial("myMaterial", this.scene)
    this.disc.material.diffuseColor = (this.value.dark ?
                                       new BABYLON.Color3(0, 0, 0) :
                                       new BABYLON.Color3(1, 1, 1))

    const shadowGenerator = new BABYLON.ShadowGenerator(1024, light)
    shadowGenerator.addShadowCaster(this.disc)
    shadowGenerator.useExponentialShadowMap = true

    ground.receiveShadows = true
    
    const pointerDragBehavior = new BABYLON.PointerDragBehavior({
      dragPlaneNormal: new BABYLON.Vector3(0,1,0)
    })

    pointerDragBehavior.useObjectOrienationForDragging = false
    
    this.disc.addBehavior(pointerDragBehavior)
    
    pointerDragBehavior.useObjectOrienationForDragging = false
    pointerDragBehavior.updateDragPlane = true

    pointerDragBehavior.onDragStartObservable.add(() => {
      this.refresh = true
    })

    pointerDragBehavior.onDragObservable.add(() => {
      this.refresh = true
    })

    pointerDragBehavior.onDragEndObservable.add(() => {
      const w = dimensions.court.width / 2 - dimensions.players.radius,
            l = dimensions.court.length / 2 - dimensions.players.radius
      this.disc.position.x = Math.max(-w, Math.min(w, this.disc.position.x))
      this.disc.position.z = Math.max(-l, Math.min(l, this.disc.position.z))
      this.$emit('input', _.defaultsDeep({
        x: this.disc.position.x,
        y: this.disc.position.z
      }, this.value))

      this.refresh = true
    })

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
