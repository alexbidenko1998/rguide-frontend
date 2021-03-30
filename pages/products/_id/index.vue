<template>
  <v-container style="position: relative; min-height: 100%">
    <v-row v-if="product" class="detailPage pt-8">
      <v-col xl="6" cols="12" style="display: flex">
        <v-card class="detailPage__modelCard">
          <div
            ref="container"
            style="width: 100%; border-radius: 4px; overflow: hidden"
          />
        </v-card>
      </v-col>
      <v-col xl="6" cols="12">
        <v-card>
          <v-card-title>{{ product.title }}</v-card-title>
          <v-card-text>{{ product.description }}</v-card-text>
          <v-divider />
          <v-card-text style="white-space: pre-wrap">{{
            product.specification
          }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
  min-height: 60vh;

  & &__modelCard {
    width: 100%;
    display: flex;
    min-height: 60vh;
  }

  @media (min-width: 1904px) {
    min-height: 80vh;

    &__modelCard {
      min-height: 80vh;
    }
  }
}
</style>
