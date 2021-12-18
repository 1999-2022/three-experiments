import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass.js'

/**
 * Base
 */

const canvas = document.querySelector('canvas')
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xf0f0f0)

const size = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
}

/**
 * Camera
 */

const camera = new THREE.PerspectiveCamera(80, size.aspectRatio)
camera.position.set(0, 0, 5)

scene.add(camera)

// Controls

const controls = new OrbitControls(camera, canvas)

/**
 * Renderer
 */

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    powerPreference: 'high-performance',
    antialias: true
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(size.width, size.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Resize
 */

window.addEventListener('resize', () => {
    size.width = window.innerWidth
    size.height = window.innerHeight

    camera.aspect = size.width / size.height
    camera.updateProjectionMatrix()

    composer.setSize(size.width, size.height)

    renderer.setSize(size.width, size.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Lights
 */

scene.add( new THREE.AmbientLight(0xf0f0f0))
const spotLight = new THREE.SpotLight(0xffffff, 1.5)

spotLight.position.set(0, 1500, 200)
spotLight.angle = Math.PI * 0.2
spotLight.castShadow = true
spotLight.shadow.camera.near = 200
spotLight.shadow.camera.far = 2000
spotLight.shadow.bias = - 0.000222
spotLight.shadow.mapSize.width = 1024
spotLight.shadow.mapSize.height = 1024

scene.add(spotLight)

// scene.add(
//     new THREE.DirectionalLight(),
//     new THREE.HemisphereLight() 
// )

/**
 * Meshes
 */

const boxesGroup = new THREE.Group()
scene.add(boxesGroup)

const boxGeo = new THREE.BoxBufferGeometry(
    10,
    10,
    10
)
const boxMat = new THREE.MeshLambertMaterial({
    color: 0xffffff
})


for (let i = 0; i < 25; i++) {
    const boxMesh = new THREE.Mesh(boxGeo, boxMat)

    boxMesh.position.x = Math.random() * 400 - 200
    boxMesh.position.y = Math.random() * 400 - 200
    boxMesh.position.z = Math.random() * 400 - 200
    boxMesh.rotation.x = Math.random()
    boxMesh.rotation.y = Math.random()
    boxMesh.rotation.z = Math.random()
    
    boxMesh.scale.setScalar(Math.random() * 10 + 2)
    boxesGroup.add(boxMesh)
}

/**
 * Post-FX
 */

const composer = new EffectComposer(renderer)

const ssaoPass = new SSAOPass(
    scene,
    camera,
    size.width,
    size.height
)

console.log(ssaoPass)

ssaoPass.kernelRadius = 16
ssaoPass.minDistance = 0.005
ssaoPass.maxDistance = 0.1

composer.addPass(ssaoPass)

/**
 * Animate
 */

// const clock = new THREE.Clock()
const tick = () => {
    // const elapsedTime = clock.getElapsedTime()

    controls.update()
    // console.log({
    //     x: camera.position.x,
    //     y: camera.position.y,
    //     z: camera.position.z
    // })
    composer.render()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()
