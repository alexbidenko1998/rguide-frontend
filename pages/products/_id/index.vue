<template>
  <div ref="container" class="detailPage" />
</template>

<script>
export default {
  data: () => ({
    product: null,
    renderer: null,
    scene: null,
    camera: null,
  }),

  async fetch() {
    try {
      this.product = await this.$axios.$get(
        `/products/${this.$route.params.id}`
      )
    } catch {
      this.$nuxt.error({ statusCode: 404 })
    }
  },

  mounted() {
    setTimeout(() => {
      import('~/scripts/model').then((model) => {
        const { scene, camera, renderer, controls } = model.init(
          this.$refs.container.clientWidth,
          this.$refs.container.clientHeight,
          this.$refs.container
        )
        this.renderer = renderer
        this.scene = scene
        this.camera = camera
        model.addObject(
          `${process.env.BASE_API}/files/models/${this.product.model}`,
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
        this.camera.aspect =
          this.$refs.container.clientWidth / this.$refs.container.clientHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(
          this.$refs.container.clientWidth,
          this.$refs.container.clientHeight
        )
        this.renderer.render(this.scene, this.camera)
      }
    },
  },
}
</script>

<style lang="scss">
.detailPage {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
