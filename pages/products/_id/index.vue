<template>
  <div ref="container" class="detailPage" />
</template>

<script>
export default {
  data: () => ({
    products: [],
  }),

  async fetch() {
    this.products = await this.$axios.$get('/products')
  },

  mounted() {
    import('~/scripts/model').then((r) => {
      const { scene, camera, renderer } = r.init(
        this.$refs.container.scrollWidth,
        this.$refs.container.scrollHeight,
        this.$refs.container
      )
      r.addElement(scene, camera)
      renderer.render(scene, camera)
    })
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
