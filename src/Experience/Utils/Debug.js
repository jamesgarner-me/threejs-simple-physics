import * as dat from 'lil-gui'
import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import Experience from '../Experience'

export default class Debug {
   constructor() {
      this.experience = new Experience()
      this.scene = this.experience.scene
      this.time = this.experience.time

      this.isActive = true // In future, may access via #debug in URL

      // FPS counter
      this.stats = Stats()
      document.body.appendChild(this.stats.dom)

      this.gui = new dat.GUI()

      this.time.on('tick', () => {
         this.update()
      })
   }

   update() {
      this.stats.update()
   }
}
