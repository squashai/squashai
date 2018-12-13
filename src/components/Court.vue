<template>
  <canvas
    width="300"
    height="400"
    touch-action="none"
    ref="canvas">
  </canvas>
</template>
<script>
import * as BABYLON from 'babylonjs'
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
  mounted() {
    let refresh = true

    const engine = new BABYLON.Engine(this.$refs.canvas, true)

    const scene = new BABYLON.Scene(engine)
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0)

    
    const camera = new BABYLON.FreeCamera("camera1",
                                          new BABYLON.Vector3(0, 10, -10),
                                          scene)

    camera.setTarget(BABYLON.Vector3.Zero())


    const hemi = new BABYLON.HemisphericLight("light1",
                                              new BABYLON.Vector3(0, 1, 0),
                                              scene)
    hemi.intensity = 0.4

    const light = new BABYLON.DirectionalLight("dir01",
                                               new BABYLON.Vector3(0,-1, 0),
                                               scene)
    light.position = new BABYLON.Vector3(0, 5, 0);
    light.intensity = 0.9;

    const ground = BABYLON.MeshBuilder.CreateGround("ground1", {
      width: dimensions.court.width,
      height: dimensions.court.length
    }, scene)

    const material = new BABYLON.StandardMaterial("ground", scene)
    material.diffuseTexture = new BABYLON.Texture(parquet, scene)
    material.diffuseTexture.onLoadObservable.add(() => {
      refresh = true
    })
    material.specularColor = new BABYLON.Color3(0, 0, 0)
    ground.material = material


    const disc = BABYLON.MeshBuilder.CreateDisc("disc1", {
      radius: dimensions.players.radius
    }, scene)
    disc.rotation.x = Math.PI / 2
    disc.position.y = 0.1

    const shadowGenerator = new BABYLON.ShadowGenerator(1024, light)
    shadowGenerator.addShadowCaster(disc)
    shadowGenerator.useExponentialShadowMap = true

    ground.receiveShadows = true
    
    const pointerDragBehavior = new BABYLON.PointerDragBehavior({
      dragPlaneNormal: new BABYLON.Vector3(0,1,0)
    })

    pointerDragBehavior.useObjectOrienationForDragging = false
    
    disc.addBehavior(pointerDragBehavior)
    
    pointerDragBehavior.useObjectOrienationForDragging = false
    pointerDragBehavior.updateDragPlane = true

    pointerDragBehavior.onDragStartObservable.add(() => {
      refresh = true
    })

    pointerDragBehavior.onDragObservable.add(() => {
      refresh = true
    })

    pointerDragBehavior.onDragEndObservable.add(() => {
      const w = dimensions.court.width / 2 - dimensions.players.radius,
            l = dimensions.court.length / 2 - dimensions.players.radius
      disc.position.x = Math.max(-w, Math.min(w, disc.position.x))
      disc.position.z = Math.max(-l, Math.min(l, disc.position.z))

      refresh = true
    })

    engine.runRenderLoop(function () { 
      if (refresh) {
        scene.render()
        refresh = false
      }
    })

    window.addEventListener("resize", () => { 
       engine.resize()
    })

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
