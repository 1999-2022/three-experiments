import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import TWEEN from "@tweenjs/tween.js"

/**
 * Base
 */

const canvas = document.querySelector('canvas')
const scenes = [new THREE.Scene(), new THREE.Scene()]
scenes[0].background = new THREE.Color(0xff0000)
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
cameras[0].position.x = -1.71
cameras[0].position.y = -0.05
cameras[0].position.z = 10

scenes[0].add(cameras[0])

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

const bigRooms = [
    new THREE.Mesh(
        new THREE.BoxBufferGeometry(5, 5, 5, 10, 5, 5),
        new THREE.MeshBasicMaterial({
            wireframe: true,
            side: THREE.DoubleSide,
            color: 0xffffff
        })
    ),
    new THREE.Mesh(
        new THREE.BoxBufferGeometry(5, 5, 5, 5, 10, 5),
        new THREE.MeshBasicMaterial({
            wireframe: true,
            side: THREE.DoubleSide,
            color: 0xffffff
        })
    )
]
bigRooms.forEach((mesh) => scenes[0].add(mesh))

const tetraGeo = new THREE.DodecahedronBufferGeometry(3, 0)
const tetraMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
})
const tetraMesh = new THREE.Mesh(tetraGeo, tetraMat)

tetraMesh.position.y = 15
tetraMesh.position.x = 3

scenes[0].add(tetraMesh)

/**
 * Animations
 */

// const positions = {
//     x: 0,
//     y: 0,
//     z: 0
// }

const camUpProps = {
    position: {
        duration: 3250,
        from: cameras[0].position,
        to: {   x: -2.8627576758033344, 
                y: -0.37053609774711294, 
                z: 9.725940648075916 
            },
        ease: TWEEN.Easing.Quartic.InOut
    },
    rotation: {
        duration: 3250,
        from: cameras[0].position,
        to: { x: -3, y: -3, z: -7 },
        ease: TWEEN.Easing.Quartic.InOut
    }
}

const animCamUpPos = new TWEEN.Tween(camUpProps.position.from)
    .to(camUpProps.position.to, camUpProps.position.duration)
    .easing(camUpProps.position.ease)
    .onStart(() => animCamUpRot)

const animCamUpRot = new TWEEN.Tween(camUpProps.rotation.from)
    .to(camUpProps.rotation.to, camUpProps.rotation.duration)
    .easing(camUpProps.rotation.ease)
/**
 * Controls
 */

canvas.onclick = () => {
    animCamUpPos.start()
}

/**
 * Animate
 */
const clock = new THREE.Clock()
const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    controls.update()
    // console.log({
    //     x: cameras[0].position.x,
    //     y: cameras[0].position.y,
    //     z: cameras[0].position.z
    // })

    renderer.render(scenes[0], cameras[0])
    window.requestAnimationFrame(tick)
    TWEEN.update()
}

tick()
