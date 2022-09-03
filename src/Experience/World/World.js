import Experience from '../Experience'
import Environment from './Environment'
import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import soundEffects from './sounds'
import { createSpheresWithPhysics, createBoxesWithPhysics } from './primitives'

export default class World {
   constructor() {
      const EARTH_GRAVITY = -9.82

      this.experience = new Experience()
      this.scene = this.experience.scene
      this.resources = this.experience.resources
      this.time = this.experience.time
      this.debug = this.experience.debug

      this.world = new CANNON.World()
      this.world.broadphase = new CANNON.SAPBroadphase(this.world)
      this.world.allowSleep = true
      this.world.gravity.set(0, EARTH_GRAVITY, 0)

      this.objectsInSceneAndWorld = []

      this.setDefaultOptions()

      this.createDefaultMaterials()

      this.createEffects()

      this.createWorldObjectsWithPhysics()

      this.environment = new Environment()

      if (this.debug.isActive) {
         this.createDebugGui()
      }

      this.time.on('tick', () => {
         this.update()
      })
   }

   setDefaultOptions() {
      this.options = {
         objectLimit: 500,
         isSoundEnabled: false,
         numberOfObjectsToGenerate: 1,
         isCreateAutomaticallyEnabled: false,
      }
   }

   createDebugGui() {
      this.debugFolder = this.debug.gui.addFolder('World Objects')

      this.debugFolder
         .add(this.options, 'objectLimit')
         .min(50)
         .max(2000)
         .step(1)
         .name('Object limit')
      this.debugFolder
         .add(this.options, 'numberOfObjectsToGenerate')
         .min(0)
         .max(5)
         .step(1)
         .name('Objects to generate')
      this.debugFolder.add(this.options, 'isSoundEnabled').name('Sound enabled')
      this.debugFolder.add(this.generateObjects, 'reset').name('Reset')
      this.debugFolder
         .add(this.generateObjects, 'createSpheresHandler')
         .name('Create sphere')
      this.debugFolder
         .add(this.generateObjects, 'createBoxesHandler')
         .name('Create box')
      this.debugFolder
         .add(this.generateObjects, 'createAutomatically')
         .name('Create automatically')
   }

   createEffects() {
      this.effects = {
         collisionSoundEffect: (collision) => {
            if (this.options.isSoundEnabled) {
               const impactStrength =
                  collision.contact.getImpactVelocityAlongNormal()
               if (impactStrength > 1.5) {
                  soundEffects.collisionSound.volume = Math.random()
                  soundEffects.collisionSound.currentTime = 0
                  soundEffects.collisionSound.play()
               }
            }
         },
      }
   }

   createDefaultMaterials() {
      const defaultMaterial = new CANNON.Material('default')
      const defaultContactMaterial = new CANNON.ContactMaterial(
         defaultMaterial,
         defaultMaterial,
         {
            friction: 0.1,
            restitution: 0.7,
         }
      )
      this.world.addContactMaterial(defaultContactMaterial)
      this.world.defaultContactMaterial = defaultContactMaterial
   }

   createFloorWithPhysics() {
      const textures = {}
      textures.color = this.resources.items.marbleFloorColor
      textures.color.encoding = THREE.sRGBEncoding
      textures.color.repeat.set(4, 4)
      textures.color.wrapS = THREE.RepeatWrapping
      textures.color.wrapT = THREE.RepeatWrapping

      textures.normal = this.resources.items.marbleFloorNormal
      textures.normal.encoding = THREE.sRGBEncoding
      textures.normal.repeat.set(4, 4)
      textures.normal.wrapS = THREE.RepeatWrapping
      textures.normal.wrapT = THREE.RepeatWrapping

      // Mesh
      const floorMaterial = new THREE.MeshStandardMaterial({
         map: textures.color,
         normalMap: textures.normal,
         metalness: 0.6,
         roughness: 0.7,
         envMap: this.resources.items.environmentMapTexture,
         envMapIntensity: 0.5,
      })
      floorMaterial.side = THREE.DoubleSide

      const floor = new THREE.Mesh(
         new THREE.CircleGeometry(20, 64),
         floorMaterial
      )
      floor.rotation.x = -Math.PI * 0.5
      floor.receiveShadow = true

      const floorShape = new CANNON.Plane()
      const floorBody = new CANNON.Body({
         mass: 0,
         shape: floorShape,
      })
      floorBody.quaternion.setFromAxisAngle(
         new CANNON.Vec3(-1, 0, 0),
         Math.PI * 0.5
      )
      this.scene.add(floor)
      this.world.addBody(floorBody)
   }

   createWorldObjectsWithPhysics() {
      this.createFloorWithPhysics()

      this.generateObjects = {
         createAutomatically: () => {
            // Automatically create spheres and boxes
            this.options.isCreateAutomaticallyEnabled = true
         },
         createSpheres: () => {
            const newSpheres = createSpheresWithPhysics(
               this.options.numberOfObjectsToGenerate,
               this.resources.items.environmentMapTexture
            )
            newSpheres.map((object) => {
               object.body.addEventListener(
                  'collide',
                  this.effects.collisionSoundEffect
               )
               this.scene.add(object.mesh)
               this.world.addBody(object.body)
            })
            // Add to all scene objects for updating in tick()
            Array.prototype.push.apply(this.objectsInSceneAndWorld, newSpheres)
         },
         createBoxes: () => {
            const newBoxes = createBoxesWithPhysics(
               this.options.numberOfObjectsToGenerate,
               this.resources.items.environmentMapTexture
            )
            newBoxes.map((object) => {
               object.body.addEventListener(
                  'collide',
                  this.effects.collisionSoundEffect
               )
               this.scene.add(object.mesh)
               this.world.addBody(object.body)
            })
            // Add to all scene objects for updating in tick()
            Array.prototype.push.apply(this.objectsInSceneAndWorld, newBoxes)
         },
         createSpheresHandler: () => {
            // Turn off autopilot
            if (this.options.isCreateAutomaticallyEnabled) {
               this.options.isCreateAutomaticallyEnabled = false
            }
            this.generateObjects.createSpheres()
         },
         createBoxesHandler: () => {
            // Turn off autopilot
            if (this.options.isCreateAutomaticallyEnabled) {
               this.options.isCreateAutomaticallyEnabled = false
            }
            this.generateObjects.createBoxes()
         },
         toggleSound: () => {
            this.options.isSoundEnabled
               ? (this.options.isSoundEnabled = false)
               : (this.options.isSoundEnabled = true)
         },
         reset: () => {
            // Turn off autopilot
            if (this.options.isCreateAutomaticallyEnabled) {
               this.options.isCreateAutomaticallyEnabled = false
            }
            this.objectsInSceneAndWorld.map((object) => {
               object.body.removeEventListener(
                  'collide',
                  this.effects.collisionSoundEffect
               )
               this.world.removeBody(object.body)
               this.scene.remove(object.mesh)
            })
            this.objectsInSceneAndWorld.splice(
               0,
               this.objectsInSceneAndWorld.length
            )
         },
      }
   }

   /** Cull objects from scene over limit (help framerate) */
   enforceObjectsLimit() {
      if (this.options.objectLimit) {
         const numberOfObjectsToRemove =
            this.objectsInSceneAndWorld.length - this.options.objectLimit
         if (numberOfObjectsToRemove > 0) {
            // Remove the objects in scope from scene, world
            this.objectsInSceneAndWorld
               .slice(0, numberOfObjectsToRemove)
               .map((object) => {
                  object.body.removeEventListener(
                     'collide',
                     this.effects.collisionSoundEffect
                  )
                  this.world.removeBody(object.body)
                  this.scene.remove(object.mesh)
               })
         }
         // Return all objects minus the oldest ones that have been culled
         this.objectsInSceneAndWorld.splice(0, numberOfObjectsToRemove)
      }
   }

   update() {
      // Update physics
      this.world.step(1 / 60, this.time.deltaTime, 10) // 60 FPS,

      // If autopilot is on, randomly generate objects
      if (this.options.isCreateAutomaticallyEnabled) {
         this.generateObjects.createSpheres()
         this.generateObjects.createBoxes()
      }

      // Update object<>body positions for all objects
      this.objectsInSceneAndWorld.map((object) => {
         object.mesh.position.copy(object.body.position)
         object.mesh.quaternion.copy(object.body.quaternion)
      })

      this.enforceObjectsLimit()
   }
}
