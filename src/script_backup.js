import './style.css'
import Experience from './Experience/Experience'

const experience = new Experience(document.querySelector('canvas.webgl'))

experience.time.tick() 

// import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import Stats from 'three/examples/jsm/libs/stats.module'
// import * as dat from 'lil-gui'
// import * as CANNON from 'cannon-es' 
// import { Shape } from 'three'
// import soundEffects from './sounds'

// /**
//  * Debug
//  */
// const gui = new dat.GUI()

// /**
//  * Stats
//  */
// const stats = Stats()
// document.body.appendChild(stats.dom)

// /**
//  * Base
//  */
// // Canvas
// const canvas = document.querySelector('canvas.webgl')

// // Scene
// const options = {
//     objectLimit: 500,
//     isSoundEnabled: false,
//     objectsInSceneAndWorld: [],
//     numberOfObjectsToGenerate: 1,
//     isCreateAutomaticallyEnabled: false,
// }

// const scene = new THREE.Scene()

// // /**
// //  * Sounds
// //  */
// const playHitSound = (collision) => {
//     if(options.isSoundEnabled) {
//         const impactStrength = collision.contact.getImpactVelocityAlongNormal()
//         if(impactStrength > 1.5) {
//             soundEffects.hitSound.volume = Math.random()
//             soundEffects.hitSound.currentTime = 0
//             soundEffects.hitSound.play()
//         }
//     }
// }

// /**
//  * Textures
//  */
// const textureLoader = new THREE.TextureLoader()
// const cubeTextureLoader = new THREE.CubeTextureLoader()

// // const environmentMapTexture = cubeTextureLoader.load([
// //     '/textures/environmentMaps/0/px.png',
// //     '/textures/environmentMaps/0/nx.png',
// //     '/textures/environmentMaps/0/py.png',
// //     '/textures/environmentMaps/0/ny.png',
// //     '/textures/environmentMaps/0/pz.png',
// //     '/textures/environmentMaps/0/nz.png'
// // ])

// /** 
//  * Physics 
//  */
// //Sphere
// const world = new CANNON.World()
// // Sweep and Prune algo improving physics performance
// world.broadphase = new CANNON.SAPBroadphase(world)
// world.allowSleep = true
// world.gravity.set(0, -9.82, 0)

// // Materials
// // const concreteMaterial = new CANNON.Material('concrete')
// // const plasticMaterial = new CANNON.Material('plastic')
// const defaultMaterial = new CANNON.Material('default')
// const defaultContactMaterial = new CANNON.ContactMaterial(
//     defaultMaterial,
//     defaultMaterial, 
//     {
//         friction: 0.1,
//         restitution: 0.7
//     }
// )
// world.addContactMaterial(defaultContactMaterial)
// world.defaultContactMaterial = defaultContactMaterial

// // Sphere
// // const sphereShape = new CANNON.Sphere(0.5)
// // const sphereBody = new CANNON.Body({
// //     mass: 1, 
// //     position: new CANNON.Vec3(0, 3, 0),
// //     shape: sphereShape,
// //     // material: defaultMaterial
// // })
// // sphereBody.applyLocalForce(new CANNON.Vec3(150, 0, 0), new CANNON.Vec3(0,0,0))
// // world.addBody(sphereBody)

// // Floor
// const floorShape = new CANNON.Plane()
// const floorBody = new CANNON.Body({
//     mass: 0, 
//     shape: floorShape,
//     // material: defaultMaterial
// })
// floorBody.quaternion.setFromAxisAngle(
//     new CANNON.Vec3(-1, 0, 0),
//     Math.PI * 0.5
// )
// world.addBody(floorBody)



// /**
//  * Test sphere
//  */
// // const sphere = new THREE.Mesh(
// //     new THREE.SphereGeometry(0.5, 32, 32),
// //     new THREE.MeshStandardMaterial({
// //         metalness: 0.3,
// //         roughness: 0.4,
// //         envMap: environmentMapTexture,
// //         envMapIntensity: 0.5
// //     })
// // )
// // sphere.castShadow = true
// // sphere.position.y = 3
// // scene.add(sphere)

// /**
//  * Floor
//  */
// const floor = new THREE.Mesh(
//     new THREE.PlaneGeometry(30, 30),
//     new THREE.MeshStandardMaterial({
//         color: '#777777',
//         metalness: 0.3,
//         roughness: 0.4,
//         // envMap: environmentMapTexture,
//         envMapIntensity: 0.5
//     })
// )
// floor.receiveShadow = true
// floor.rotation.x = - Math.PI * 0.5
// scene.add(floor)

// /**
//  * Lights
//  */
// const ambientLight = new THREE.AmbientLight(0xffffff, 1)
// scene.add(ambientLight)

// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
// directionalLight.castShadow = true
// directionalLight.shadow.mapSize.set(1024, 1024)
// directionalLight.shadow.camera.far = 20
// directionalLight.shadow.camera.left = - 10
// directionalLight.shadow.camera.top = 10
// directionalLight.shadow.camera.right = 10
// directionalLight.shadow.camera.bottom = - 10
// directionalLight.position.set(5, 5, 5)
// scene.add(directionalLight)

// /**
//  * Sizes
//  */
// const sizes = {
//     width: window.innerWidth,
//     height: window.innerHeight
// }

// window.addEventListener('resize', () =>
// {
//     // Update sizes
//     sizes.width = window.innerWidth
//     sizes.height = window.innerHeight

//     // Update camera
//     camera.aspect = sizes.width / sizes.height
//     camera.updateProjectionMatrix()

//     // Update renderer
//     renderer.setSize(sizes.width, sizes.height)
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// })

// /**
//  * Camera
//  */
// // Base camera
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 500)
// camera.position.set(- 8, 8, 8)
// scene.add(camera)

// // Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

// /**
//  * Renderer
//  */
// const renderer = new THREE.WebGLRenderer({
//     canvas: canvas
// })
// renderer.shadowMap.enabled = true
// renderer.shadowMap.type = THREE.PCFSoftShadowMap
// renderer.setSize(sizes.width, sizes.height)
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// /**
//  * Create objects
//  */
// const randomColorRgb = () => {
//     return `rgb(
//         ${(Math.random() * 255).toFixed()},
//         ${(Math.random() * 255).toFixed()},
//         ${(Math.random() * 255).toFixed()}
//     )`
// }

// const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)
// const createSphereMesh = (radius, position) => {
//     const color = randomColorRgb()
//     const mesh = new THREE.Mesh(
//         sphereGeometry,
//         new THREE.MeshStandardMaterial({
//             color,
//             metalness: 0.3, 
//             roughness: 0.4, 
//             // envMap: environmentMapTexture, 
//             envMapIntensity: 0.5
//         })
//     )
//     mesh.scale.set(radius, radius, radius)
//     mesh.castShadow = true
//     mesh.position.copy(position)

//     return mesh
// }
// const createSphereBody = (radius, position) => {
//     const shape = new CANNON.Sphere(radius)
//     const body = new CANNON.Body({
//         mass: 1, 
//         position,
//         shape
//     })
//     body.addEventListener('collide', playHitSound)
//     return body
// }
// const createSpheresWithPhysics = (count) => {
//     let spheres = new Array();
//     for(let i=0; i < count; i++) {
//         let radius = Math.random() * 0.75     
//         let mesh = createSphereMesh(radius, new THREE.Vector3(
//             (Math.random() - 0.5) * 3,
//             (Math.random() + 2)   * 3,
//             (Math.random() - 0.5) * 3,
//         ))    
//         let body = createSphereBody(radius, mesh.position)
//         let sphereWithPhysics = {
//             mesh,
//             body
//         }

//         spheres.push(sphereWithPhysics)
//     }
//     return spheres
// } 

// const boxGeometry = new THREE.BoxBufferGeometry(1, 1, 1)
// const createBoxMesh = (w, h, d, position) => {
//     const color = randomColorRgb()
//     const mesh = new THREE.Mesh(
//         boxGeometry, 
//         new THREE.MeshStandardMaterial({
//             color,
//             metalness: 0.3,
//             roughness: 0.4, 
//             // envMap: environmentMapTexture, 
//             envMapIntensity: 0.5
//         })
//     )
//     mesh.scale.set(w, h, d)
//     mesh.castShadow = true
//     mesh.position.copy(position)

//     return mesh
// }

// const createBoxBody = (w, h, d, position) => {
//     const shape = new CANNON.Box(
//         new CANNON.Vec3(w * 0.5, h * 0.5, d * 0.5)
//     )
//     const body = new CANNON.Body({
//         mass: 1, 
//         shape
//     })
//     body.addEventListener('collide', playHitSound)
//     body.position.copy(position)
//     return body
// }

// const createBoxesWithPhysics = (count) => {
//     let boxes = new Array(); 
//     for(let i=0; i < count; i++) {
//         let w  = Math.random()
//         let h  = Math.random()
//         let d  = Math.random()

//         let mesh = createBoxMesh(w, h, d, new THREE.Vector3(
//             (Math.random() - 0.5) * 3,
//             (Math.random() + 2)   * 3,
//             (Math.random() - 0.5) * 3,
//         ))

//         let body = createBoxBody(w, h, d, mesh.position)
        
//         let boxWithPhysics = {
//             mesh, 
//             body
//         }
//         boxes.push(boxWithPhysics)
//     }
//     return boxes
// }

// const generateObject = {
//     createAutomatically: () => {
//         // Automatically create spheres and boxes on an interval
//         // Turn on autopilot
//         options.isCreateAutomaticallyEnabled = true
//     },
//     createSpheres: () => {
//         const newSpheres = createSpheresWithPhysics(options.numberOfObjectsToGenerate)
//         newSpheres.map((object) => {
//             scene.add(object.mesh)
//             world.addBody(object.body)
//         })
//         // Add to all scene objects for updating in tick()
//         Array.prototype.push.apply(
//             options.objectsInSceneAndWorld,
//             newSpheres
//         )
//     },
//     createBoxes: () => {
//         const newBoxes = createBoxesWithPhysics(options.numberOfObjectsToGenerate)
//         newBoxes.map((object) => {
//             scene.add(object.mesh)
//             world.addBody(object.body)
//         })
//         // Add to all scene objects for updating in tick()
//         Array.prototype.push.apply(
//             options.objectsInSceneAndWorld, 
//             newBoxes
//         )
//     },
//     createSpheresHandler: () => {
//         // Turn off autopilot
//         if(options.isCreateAutomaticallyEnabled) { 
//             options.isCreateAutomaticallyEnabled = false
//         }
//         generateObject.createSpheres()
//     },
//     createBoxesHandler: () => {
//         // Turn off autopilot
//         if(options.isCreateAutomaticallyEnabled) { 
//             options.isCreateAutomaticallyEnabled = false
//         }
//         generateObject.createBoxes()
//     },
//     // scaleObjectCount: (count) => {
//     //     options.objectLimit = count
//     // },
//     toggleSound: () => {
//         options.isSoundEnabled ? options.isSoundEnabled = false : options.isSoundEnabled = true
//     },
//     reset: () => {
//         // Turn off autopilot
//         if(options.isCreateAutomaticallyEnabled) { 
//             options.isCreateAutomaticallyEnabled = false
//         }
//         options.objectsInSceneAndWorld.map((object) => {
//             object.body.removeEventListener('collide', playHitSound)
//             world.removeBody(object.body)
//             scene.remove(object.mesh)
//         })
//         options.objectsInSceneAndWorld.splice(0, options.objectsInSceneAndWorld.length)
//     }
// }

// /**
//  * GUI Controls to add more spheres
//  */
//  gui
//     .add(options, 'objectLimit')
//     .min(50)
//     .max(2000)
//     .step(1)
//     .name('Object Limit')
// gui
//     .add(options, 'numberOfObjectsToGenerate')
//     .min(0)
//     .max(5)
//     .step(1)
//     .name('Objects to generate')
// gui
//     .add(generateObject, 'reset')
//     .name('Reset')
// gui
//     .add(generateObject, 'toggleSound')
//     .name('Toggle sound')
// gui
//     .add(generateObject, 'createSpheresHandler')
//     .name('Create Sphere')
// gui
//     .add(generateObject, 'createBoxesHandler')
//     .name('Create Box')
// gui
//     .add(generateObject, 'createAutomatically')
//     .name('Create Automatically')


// // const objectsInSceneAndWorld = createSpheresWithPhysics(10)
// // Add generated spheres to scene and world
// // options.objectsInSceneAndWorld.map((object) => {
// //     scene.add(object.mesh)
// //     world.add(object.body)
// // })

// // const sphereMesh = createSphereMesh(0.5, new THREE.Vector3(0, 3, 0))
// // const sphereBody = createSphereBody(0.5, sphereMesh.position)
// // const sphereWithPhysics = {
// //     mesh: sphereMesh,
// //     body: sphereBody
// // }
// // scene.add(sphereWithPhysics.mesh)
// // world.add(sphereWithPhysics.body)

// /**
//  * Animate
//  */
// const clock = new THREE.Clock()
// let oldElapsedTime = 0

// const tick = () =>
// {
//     const elapsedTime = clock.getElapsedTime()
//     const deltaTime = elapsedTime - oldElapsedTime
//     oldElapsedTime = elapsedTime

//     // Update physics
//     world.step(1/60, deltaTime, 10); // 60 FPS, 

//     // If autopilot is on, randomly generate objects
//     if(options.isCreateAutomaticallyEnabled) {
//         generateObject.createSpheres()
//         generateObject.createBoxes()
//     }

//     // Update object<>body positions for all objects
//     options.objectsInSceneAndWorld.map((object) => {
//         object.mesh.position.copy(
//             object.body.position
//         )
//         object.mesh.quaternion.copy(
//             object.body.quaternion
//         )
//     })

//     // Apply an object limit - remove objects over limit
//     if(options.objectLimit) {
//         // console.log(`object limit in force`)
//         const numberOfObjectsToRemove = options.objectsInSceneAndWorld.length - options.objectLimit
//         if (numberOfObjectsToRemove > 0) {
//             // Remove the objects in scope from scene, world (slice is immutable)
//             options.objectsInSceneAndWorld.slice(0, numberOfObjectsToRemove).map((object) => {
//                 object.body.removeEventListener('collide', playHitSound)
//                 world.removeBody(object.body)
//                 scene.remove(object.mesh)
//             })
//         }
//         // Return all objects minus the oldest ones that have been culled (splice is mutable)
//         options.objectsInSceneAndWorld.splice(0, numberOfObjectsToRemove)
//     }

//     // Apply a force (e.g. wind) to the sphere
//     // given it's not local, specify where the force is applied
//     // sphereBody.applyForce(new CANNON.Vec3(-0.5, 0, 0), sphereBody.position)

//     // Update controls
//     controls.update()

//     // Update stats (e.g. FPS)
//     stats.update()

//     // Render
//     renderer.render(scene, camera)

//     // Call tick again on the next frame
//     window.requestAnimationFrame(tick)

// }

// tick()