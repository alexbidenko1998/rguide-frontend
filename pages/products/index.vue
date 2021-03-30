<template>
  <v-row class="productsPage">
    <v-col class="text-center">
      <v-tabs v-if="!search" v-model="categoryIndex" show-arrows class="mb-4">
        <v-tab v-for="c in categories" :key="c.id">{{ c.title }}</v-tab>
      </v-tabs>

      <v-text-field
        v-model="search"
        label="Поиск"
        clearable
        class="productsPage__search"
      />

      <Card v-for="product in products" :key="product.id" :product="product" />
    </v-col>
  </v-row>
</template>

<script>
import Card from '~/components/Card/Card.vue'

export default {
  components: { Card },

  data: () => ({
    categories: [],
    products: [],
    categoryIndex: 0,
    search: '',
    timer: null,
  }),

  async fetch() {
    this.categories = await this.$axios.$get('/categories')
    this.products = await this.$axios.$get('/products', {
      params: { category_id: this.categories[0].id },
    })
  },

  watch: {
    search(val) {
      clearTimeout(this.timer)
      setTimeout(() => {
        this.$axios
          .$get('/products', {
            params: {
              q: val,
              category_id: val
                ? undefined
                : this.categories[this.categoryIndex].id,
            },
          })
          .then((products) => {
            this.products = products
          })
      }, 500)
    },
    categoryIndex(val) {
      this.$axios
        .$get('/products', {
          params: {
            category_id: this.categories[val].id,
          },
        })
        .then((products) => {
          this.products = products
        })
    },
  },
}
</script>

<style lang="scss">
.productsPage {
  height: 100%;
  overflow: auto;

  & &__search {
    max-width: 374px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
