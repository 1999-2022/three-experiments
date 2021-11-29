
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js"
import TWEEN from "@tweenjs/tween.js"

import './style.css'

/**
 * Base
 */

const canvas = document.querySelector('canvas')
const scenes = [new THREE.Scene(), new THREE.Scene()]
scenes[0].background = new THREE.Color(0x000000)
const fontLoader = new FontLoader()
const size = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
}

/**
 * Camera
 */

// Camera 1
let cameras = []

cameras[0] = new THREE.PerspectiveCamera(60, size.aspectRatio, 1, 1000)
cameras[0].position.set(1.065659852390964, 0.13341093432350543, 0.0016590048900783502)
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

const i = new THREE.Mesh(
    new THREE.BoxBufferGeometry(0, 100, 1, 5, 1, 1),
    new THREE.MeshBasicMaterial({
        color: new THREE.Color(0xffffff),
        wireframe: true,
        side: THREE.DoubleSide
    })
)

const x = new THREE.Mesh(
    new THREE.BoxBufferGeometry(0, 100, 1, 5, 1, 1),
    new THREE.MeshBasicMaterial({
        color: new THREE.Color(0xffffff),
        wireframe: true,
        side: THREE.DoubleSide
    })
)

const y = new THREE.Mesh(
    new THREE.BoxBufferGeometry(0, 100, 1, 5, 1, 1),
    new THREE.MeshBasicMaterial({
        color: new THREE.Color(0xffffff),
        wireframe: true,
        side: THREE.DoubleSide
    })
)

const z = new THREE.Mesh(
    new THREE.BoxBufferGeometry(0, 100, 1, 5, 1, 1),
    new THREE.MeshBasicMaterial({
        color: new THREE.Color(0xffffff),
        wireframe: true,
        side: THREE.DoubleSide
    })
)

x.position.y = 2.5
y.position.y = 5
z.position.y = 7.5

scenes[0].add(i)
scenes[0].add(x)
scenes[0].add(y)
scenes[0].add(z)

/**
 * Animate
 */
const clock = new THREE.Clock()
const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    i.rotation.y += 0.01
    x.rotation.y += 0.01
    y.rotation.y += 0.01 
    z.rotation.y += 0.01
    
    controls.update()
    renderer.render(scenes[0], cameras[0])
    window.requestAnimationFrame(tick)
    TWEEN.update()
}

tick()
