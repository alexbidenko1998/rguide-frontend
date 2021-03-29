<template>
  <v-row class="productsPage">
    <v-col class="text-center">
      <v-text-field
        v-model="search"
        label="Поиск"
        clearable
        class="productsPage__search"
      />

      <img src="/v.png" alt="Vuetify.js" class="mb-5" />

      <Card v-for="product in products" :key="product.id" :product="product" />
    </v-col>
  </v-row>
</template>

<script>
import Card from '~/components/Card/Card.vue'

export default {
  components: { Card },

  data: () => ({
    products: [],
    search: '',
    timer: null,
  }),

  async fetch() {
    this.products = await this.$axios.$get('/products')
  },

  watch: {
    search(val) {
      clearTimeout(this.timer)
      setTimeout(() => {
        this.$axios.$get(`/products?q=${val || ''}`).then((products) => {
          this.products = products
        })
      }, 500)
    },
  },
}
</script>

<style lang="scss">
.productsPage {
  height: 100%;
  overflow: auto;

  &__search {
    max-width: 374px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
