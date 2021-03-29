<template>
  <div ref="container" class="detailPage" />
</template>

<script>
export default {
  data: () => ({
    product: null,
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
          this.$refs.container.scrollWidth,
          this.$refs.container.scrollHeight,
          this.$refs.container
        )
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
  overflow: auto;
}
</style>
