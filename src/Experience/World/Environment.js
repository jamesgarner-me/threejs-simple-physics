import Experience from '../Experience'
import * as THREE from 'three'
import sources from '../sources'

export default class Environment {
   constructor() {
      this.experience = new Experience()
      this.scene = this.experience.scene
      this.resources = this.experience.resources
      this.debug = this.experience.debug
      this.debugFolder = this.debug.gui.addFolder('Environment').open(false)

      this.setSunLight()
      this.setEnvironmentMap()

      // if (this.debug.isActive) {
      //    this.debugFolder = this.debug.gui.addFolder('Environment')
      // }
   }

   setSunLight() {
      this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
      this.scene.add(this.ambientLight)

      this.sunLight = new THREE.DirectionalLight(0xffffff, 0.8)
      this.sunLight.castShadow = true
      this.sunLight.shadow.mapSize.set(1024, 1024)
      this.sunLight.shadow.camera.far = 100
      this.sunLight.shadow.camera.left = -10
      this.sunLight.shadow.camera.top = 10
      this.sunLight.shadow.camera.right = 10
      this.sunLight.shadow.camera.bottom = -10
      this.sunLight.position.set(-10, 5, 4)
      this.scene.add(this.sunLight)

      // Light helper
      const directionalLightHelper = new THREE.DirectionalLightHelper(
         this.sunLight,
         5
      )
      directionalLightHelper.visible = false
      this.scene.add(directionalLightHelper)

      if (this.debug.isActive) {
         this.debugFolder
            .add(this.sunLight, 'intensity')
            .min(0)
            .max(1)
            .step(0.001)
            .name('sunLight Intensity')
         this.debugFolder
            .add(this.ambientLight, 'intensity')
            .min(0)
            .max(1)
            .step(0.001)
            .name('ambientLight Intensity')
         this.debugFolder
            .add(directionalLightHelper, 'visible')
            .name('directionalLightHelper')
      }
   }

   setEnvironmentMap() {
      this.environmentMap = {}
      this.environmentMap.intensity = 0.4
      this.environmentMap.texture = this.resources.items.environmentMapTexture
      this.environmentMap.texture.encoding = THREE.sRGBEncoding

      this.scene.environment = this.environmentMap.texture

      this.setEnvironmentMap.updateMaterial = () => {
         this.scene.traverse((child) => {
            if (
               child instanceof THREE.Mesh &&
               child.material instanceof THREE.MeshStandardMaterial
            ) {
               child.material.envMap = this.environmentMap.texture
               child.material.envMapIntensity = this.environmentMap.intensity
               child.material.needsUpdate = true
            }
         })
      }

      this.setEnvironmentMap.updateMaterial()
   }
}
