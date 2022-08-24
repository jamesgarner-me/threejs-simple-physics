import * as THREE from 'three'
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import { RedFormat, REVISION } from 'three'
import World from './World/World.js'
import Resources from './Utils/Resources.js'
import Debug from './Utils/Debug.js'
import sources from './sources'

export default class Experience {
   constructor(canvas) {
      // Enable singleton for adjacent class access
      if (Experience._instance) {
         return Experience._instance
      }
      Experience._instance = this
      this.canvas = canvas

      // Setup
      this.sizes = new Sizes()
      this.time = new Time()
      this.scene = new THREE.Scene()
      this.resources = new Resources(sources)
      this.camera = new Camera()
      this.renderer = new Renderer()
      this.debug = new Debug()

      this.sizes.on('resize', () => {
         this.resize()
      })

      this.time.on('tick', () => {
         this.update()
      })

      this.resources.on('resourcesLoaded', () => {
         this.resourcesLoaded()
      })
   }

   resize() {
      this.camera.resize()
      this.renderer.resize()
   }

   update() {
      this.camera.update()
      this.renderer.update()
   }

   resourcesLoaded() {
      this.world = new World()
      this.scene.background = this.resources.items['skyBoxTexture']
   }
}
