/* eslint-disable unicorn/number-literal-case */
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { PerspectiveCamera, Renderer, Scene } from 'three'

export const init = (
  width: number,
  height: number,
  element: HTMLDivElement
) => {
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.outputEncoding = THREE.sRGBEncoding
  renderer.shadowMap.enabled = true
  renderer.setSize(width, height)
  element.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xa0a0a0)

  const skyColor = 0xb1e1ff
  const groundColor = 0xb97a20
  const intensity = 1
  const light = new THREE.HemisphereLight(skyColor, groundColor, intensity)
  scene.add(light)

  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.addEventListener('change', () => renderer.render(scene, camera))

  camera.position.set(0, 4, 4)
  controls.update()

  return {
    scene,
    camera,
    renderer,
    controls,
  }
}

export const addObject = (
  url: string,
  scene: Scene,
  controls: OrbitControls,
  renderer: Renderer,
  camera: PerspectiveCamera
) => {
  const gltfLoader = new GLTFLoader()
  gltfLoader.load(url, (gltf) => {
    const model = gltf.scene
    scene.add(model)

    const skeleton = new THREE.SkeletonHelper(model)
    skeleton.visible = false
    scene.add(skeleton)
    controls.update()
    renderer.render(scene, camera)
  })
}
