import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */

const canvas = document.querySelector('canvas.scene0')
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xff0000)
const size = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
}
const fontLoader = new THREE.FontLoader()

/**
 * Camera
 */
// Camera 1
let cameras = []

cameras[0] = new THREE.PerspectiveCamera(80, size.aspectRatio)
scene.add(cameras[0])
cameras[0].position.x = 0
cameras[0].position.y = 0
cameras[0].position.z = 5

// Controls
const controls = new OrbitControls(cameras[0], canvas)

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

    cameras[0].aspect = size.width / size.height
    cameras[0].updateProjectionMatrix()

    renderer.setSize(size.width, size.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Meshes
 */

const bigRoom = new THREE.Mesh(
    new THREE.BoxBufferGeometry(5, 5, 5, 10, 5, 5),
    new THREE.MeshBasicMaterial({
        wireframe: true,
        side: THREE.DoubleSide,
        color: 0xffffff
    })
)



scene.add(bigRoom)

/**
 * Animate
 */
// const clock = new THREE.Clock()
const tick = () => {
    // const elapsedTime = clock.getElapsedTime()

    controls.update()
    renderer.render(scene, cameras[0])
    window.requestAnimationFrame(tick)
}

tick()
