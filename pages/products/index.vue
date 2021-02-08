<template>
  <v-row class="productsPage">
    <v-col class="text-center">
      <img src="/v.png" alt="Vuetify.js" class="mb-5" />

      <Card v-for="product in products" :key="product.id" :product="product" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Card from '~/components/Card/Card.vue'

export default {
  components: { Card },

  data: () => ({
    products: [],
  }),

  async fetch() {
    this.products = await this.$axios.$get('/products')
  },
}
</script>

<style lang="scss">
.productsPage {
  height: 100%;
  overflow: auto;
}
</style>
