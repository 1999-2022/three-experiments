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

/**
 * Animations
 */

const boxUpProps = {
    position: {
        duration: 250,
        from: bigRooms[0].position,
        to: { y: -1 },
        ease: TWEEN.Easing.Linear.None
    }
}

const boxDownProps = {
    position: {
        duration: 250,
        from: bigRooms[0].position,
        to: { y: 1 },
        ease: TWEEN.Easing.Linear.None
    }
}

const boxUpLayerProps = {
    position: {
        duration: 250,
        from: bigRooms[1].position,
        to: { y: -0.5 },
        ease: TWEEN.Easing.Linear.None
    }
}

const boxDownLayerProps = {
    position: {
        duration: 250,
        from: bigRooms[1].position,
        to: { y: 0.5 },
        ease: TWEEN.Easing.Linear.None
    }
}

const boxDownPos = new TWEEN.Tween(boxDownProps.position.from)
    .to(boxDownProps.position.to, boxDownProps.position.duration)
    .easing(boxDownProps.position.ease)

const boxUpPos = new TWEEN.Tween(boxUpProps.position.from)
    .to(boxUpProps.position.to, boxUpProps.position.duration)
    .easing(boxUpProps.position.ease)
    .start()

const boxDownLayerPos = new TWEEN.Tween(boxDownLayerProps.position.from)
    .to(boxDownLayerProps.position.to, boxDownLayerProps.position.duration)
    .easing(boxDownLayerProps.position.ease)

const boxUpLayerPos = new TWEEN.Tween(boxUpLayerProps.position.from)
    .to(boxUpLayerProps.position.to, boxUpLayerProps.position.duration)
    .easing(boxUpLayerProps.position.ease)
    .start()

boxDownPos.chain(boxUpPos)
boxUpPos.chain(boxDownPos)

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
