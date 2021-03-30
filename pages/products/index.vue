<template>
  <v-container style="position: relative; min-height: 100%">
    <v-row class="productsPage">
      <v-tabs v-if="!search" v-model="categoryIndex" show-arrows class="mb-4">
        <v-tab v-for="c in categories" :key="c.id">{{ c.title }}</v-tab>
      </v-tabs>
      <v-col class="text-center">
        <v-text-field
          v-model="search"
          label="Поиск"
          clearable
          class="productsPage__search"
        />

        <v-row v-if="!groupedProducts">
          <v-col
            v-for="product in products"
            :key="product.id"
            cols="12"
            lg="4"
            md="6"
            xl="3"
            class="productsPage__col"
          >
            <Card :product="product" />
          </v-col>
        </v-row>

        <div v-for="group in groupedProducts" v-else :key="group.id">
          <v-row class="mx-0">
            <v-card-title class="px-0">{{ group.title }}</v-card-title>
            <v-spacer />

            <v-btn icon @click="toggleOpen(group.id)">
              <v-icon>{{
                openedGroups.includes(group.id)
                  ? 'mdi-chevron-up'
                  : 'mdi-chevron-down'
              }}</v-icon>
            </v-btn>
          </v-row>
          <v-expand-transition>
            <v-row v-show="openedGroups.includes(group.id)">
              <v-col
                v-for="product in group.products"
                :key="product.id"
                cols="12"
                lg="4"
                md="6"
                xl="3"
                class="productsPage__col"
              >
                <Card :product="product" />
              </v-col>
            </v-row>
          </v-expand-transition>
        </div>
      </v-col>
    </v-row>
  </v-container>
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
    openedGroups: [],
  }),

  async fetch() {
    this.categories = await this.$axios.$get('/categories')
    this.products = await this.$axios.$get('/products', {
      params: { category_id: this.categories[0].id },
    })
  },

  computed: {
    groupedProducts() {
      const grouped = this.products.find((f) => f.group)
      if (grouped) {
        return this.products.reduce((a, el) => {
          if (!el.group) return a
          const group = a.find((f) => f.id === el.group?.id)
          if (group) {
            group.products.push(el)
            return a
          } else return [...a, { ...el.group, products: [el] }]
        }, [])
      }
      return null
    },
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

  methods: {
    toggleOpen(id) {
      if (this.openedGroups.includes(id))
        this.openedGroups = this.openedGroups.filter((f) => f !== id)
      else this.openedGroups = [...this.openedGroups, id]
    },
  },
}
</script>

<style lang="scss">
.productsPage {
  height: 100%;
  overflow: auto;

  & &__search {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
