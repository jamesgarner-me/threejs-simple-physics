import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import { randomColorRgb } from '../Utils/utils'

export { createSpheresWithPhysics, createBoxesWithPhysics }

const createSphereMesh = (radius, position, environmentMapTexture) => {
   const color = randomColorRgb()
   const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 32),
      new THREE.MeshStandardMaterial({
         color,
         metalness: 0.3,
         roughness: 0.4,
         envMap: environmentMapTexture,
         envMapIntensity: 0.5,
      })
   )
   mesh.scale.set(radius, radius, radius)
   mesh.castShadow = true
   mesh.position.copy(position)

   return mesh
}

const createSphereBody = (radius, position) => {
   const shape = new CANNON.Sphere(radius)
   const body = new CANNON.Body({
      mass: 1,
      position,
      shape,
   })
   return body
}

/** Create physics enabled spheres with random sizes and colours */
const createSpheresWithPhysics = (count, environmentMapTexture) => {
   let spheres = new Array()
   for (let i = 0; i < count; i++) {
      let radius = Math.random() * 0.75
      let mesh = createSphereMesh(
         radius,
         new THREE.Vector3(
            (Math.random() - 0.5) * 3,
            (Math.random() + 3) * 3,
            (Math.random() - 0.5) * 3
         ),
         environmentMapTexture
      )
      let body = createSphereBody(radius, mesh.position)
      let sphereWithPhysics = {
         mesh,
         body,
      }
      spheres.push(sphereWithPhysics)
   }
   return spheres
}

const createBoxMesh = (w, h, d, position, environmentMapTexture) => {
   const color = randomColorRgb()
   const mesh = new THREE.Mesh(
      new THREE.BoxBufferGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({
         color,
         metalness: 0.3,
         roughness: 0.4,
         envMap: environmentMapTexture,
         envMapIntensity: 0.5,
      })
   )
   mesh.scale.set(w, h, d)
   mesh.castShadow = true
   mesh.position.copy(position)

   return mesh
}

const createBoxBody = (w, h, d, position) => {
   const shape = new CANNON.Box(new CANNON.Vec3(w * 0.5, h * 0.5, d * 0.5))
   const body = new CANNON.Body({
      mass: 1,
      shape,
   })
   body.position.copy(position)
   return body
}

/** Create physics enabled boxes with random sizes and colours */
const createBoxesWithPhysics = (count, environmentMapTexture) => {
   let boxes = new Array()
   for (let i = 0; i < count; i++) {
      let w = Math.random()
      let h = Math.random()
      let d = Math.random()

      let mesh = createBoxMesh(
         w,
         h,
         d,
         new THREE.Vector3(
            (Math.random() - 0.5) * 3,
            (Math.random() + 3) * 3,
            (Math.random() - 0.5) * 3
         ),
         environmentMapTexture
      )

      let body = createBoxBody(w, h, d, mesh.position)

      let boxWithPhysics = {
         mesh,
         body,
      }
      boxes.push(boxWithPhysics)
   }
   return boxes
}
