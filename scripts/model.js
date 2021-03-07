/* eslint-disable unicorn/number-literal-case */
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export const init = (width, height, element) => {
  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(width, height)
  element.appendChild(renderer.domElement)

  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.addEventListener('change', () => renderer.render(scene, camera))

  camera.position.set(0, 4, 4)
  controls.update()

  return {
    scene,
    camera,
    renderer,
  }
}

export const addElement = (scene) => {
  const geometry = new THREE.BoxGeometry()
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)
}
