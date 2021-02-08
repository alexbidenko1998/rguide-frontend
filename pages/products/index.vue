<template>
  <v-row class="productsPage">
    <v-col class="text-center">
      <img src="/v.png" alt="Vuetify.js" class="mb-5" />

      <Card v-for="product in products" :key="product.id" :product="product" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import Card from '~/components/Card/Card.vue'
import { ProductType } from '~/types/products'

export default Vue.extend({
  components: { Card },

  data: () => ({
    products: [] as ProductType[],
  }),

  async fetch() {
    this.products = await this.$axios.$get<ProductType[]>('/products')
  },
})
</script>

<style lang="scss">
.productsPage {
  height: 100%;
  overflow: auto;
}
</style>
