import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */

const canvas = document.querySelector('canvas')
const scenes = [new THREE.Scene(), new THREE.Scene()]
scenes[0].background = new THREE.Color(0xf0f0f0)
const size = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
}

/**
 * Camera
 */
let cameras = []

// Camera 1
cameras[0] = new THREE.PerspectiveCamera(80, size.aspectRatio)
cameras[0].position.set(0, 0, 5)
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
 * Lights
 */

 scenes[0].add( new THREE.AmbientLight( 0xf0f0f0 ) )
 const light = new THREE.SpotLight( 0xffffff, 1.5 )
 light.position.set( 0, 1500, 200 )
 light.angle = Math.PI * 0.2
 light.castShadow = true
 light.shadow.camera.near = 200
 light.shadow.camera.far = 2000
 light.shadow.bias = - 0.000222
 light.shadow.mapSize.width = 1024
 light.shadow.mapSize.height = 1024
 scenes[0].add( light )
 const helper = new THREE.GridHelper( 2000, 100 );
 helper.position.y = - 199;
 helper.material.opacity = 0.25;
 helper.material.transparent = true;
 scenes[0].add( helper );

/**
 * Meshes
 */

 const planeGeometry = new THREE.PlaneGeometry( 2000, 2000 );
 planeGeometry.rotateX( - Math.PI / 2 );
 const planeMaterial = new THREE.ShadowMaterial( { opacity: 0.2 } );

 const plane = new THREE.Mesh( planeGeometry, planeMaterial );
 plane.position.y = - 200;
 plane.receiveShadow = true;
 scenes[0].add( plane );

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
}

tick()
