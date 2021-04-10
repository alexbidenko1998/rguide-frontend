import Vue from 'vue'
import { PerspectiveCamera, Renderer, Scene } from 'three'
import { ProductType } from '~/types/products'

export default Vue.extend({
  async asyncData({ $axios, error, route }) {
    try {
      const product = await $axios.$get<ProductType>(
        `/products/${route.params.id}`
      )
      return { product }
    } catch {
      error({ statusCode: 404 })
    }
  },

  data: () => ({
    product: null as ProductType | null,
    renderer: null as Renderer | null,
    scene: null as Scene | null,
    camera: null as PerspectiveCamera | null,
  }),

  mounted() {
    setTimeout(() => {
      import('~/scripts/model').then((model) => {
        const container = this.$refs.container as HTMLDivElement
        const { scene, camera, renderer, controls } = model.init(
          container.clientWidth,
          container.clientHeight,
          container
        )
        this.renderer = renderer
        this.scene = scene
        this.camera = camera
        model.addObject(
          `${process.env.BASE_API}/files/models/${this.product!.model}`,
          scene,
          controls,
          renderer,
          camera
        )
        renderer.render(scene, camera)
        controls.update()
      })
    }, 200)
    window.addEventListener('resize', this.resize)
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.resize)
  },

  methods: {
    resize() {
      if (this.renderer && this.scene && this.camera) {
        const container = this.$refs.container as HTMLDivElement
        this.camera.aspect = container.clientWidth / container.clientHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(container.clientWidth, container.clientHeight)
        this.renderer.render(this.scene, this.camera)
      }
    },
  },
})
