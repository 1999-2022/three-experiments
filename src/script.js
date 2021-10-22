import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */

const canvas = document.querySelector('canvas.scene0')
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xffffff)
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
    new THREE.BoxBufferGeometry(5, 5, 5),
    new THREE.MeshBasicMaterial({
        wireframe: false,
        side: THREE.DoubleSide,
        color: 0xff0000
    })
)

fontLoader.load("fonts/helvetiker_regular.typeface.json",
    (font) => {
        const geometry = new THREE.TextGeometry("Hi", {
            font: font,
            size: 0.75,
            height: 0.5
        })
        geometry.scale(1, 1, 0.1)
        const material = new THREE.MeshBasicMaterial({
            color: 0x000000,
            wireframe: false
        })
        const mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)
        mesh.position.set(-0.35, -0.35, 0)
    }
)

scene.add(bigRoom)

/**
 * Animate
 */
// const clock = new THREE.Clock()
const tick = () => {
    // const elapsedTime = clock.getElapsedTime()

    cameras[0].rotation.z += 1

    controls.update()
    renderer.render(scene, cameras[0])
    window.requestAnimationFrame(tick)
}

tick()
