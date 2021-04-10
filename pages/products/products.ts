import Vue from 'vue'
import Card from '~/components/Card/Card.vue'
import { CategoryType } from '~/types/categories'
import { ProductType } from '~/types/products'
import { GroupType } from '~/types/groups'

export default Vue.extend({
  components: { Card },

  data: () => ({
    categories: [] as CategoryType[],
    products: [] as ProductType[],
    categoryIndex: 0,
    search: '',
    timer: 0 as number,
    openedGroups: [] as number[],
  }),

  async fetch() {
    this.categories = await this.$axios.$get<CategoryType[]>('/categories')
    this.products = await this.$axios.$get<ProductType[]>('/products', {
      params: { category_id: this.categories[0].id },
    })
  },

  computed: {
    groupedProducts(): (GroupType & { products: ProductType[] })[] | null {
      const grouped = this.products.some((f) => f.group)
      if (grouped) {
        return this.products.reduce((a, el) => {
          if (!el.group) return a
          const group = a.find((f) => f.id === el.group?.id)
          if (group) {
            group.products.push(el)
            return a
          } else return [...a, { ...el.group, products: [el] }]
        }, [] as (GroupType & { products: ProductType[] })[])
      }
      return null
    },
  },

  watch: {
    search(val) {
      clearTimeout(this.timer)
      setTimeout(() => {
        this.$axios
          .$get<ProductType[]>('/products', {
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
        .$get<ProductType[]>('/products', {
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
    toggleOpen(id: number) {
      if (this.openedGroups.includes(id))
        this.openedGroups = this.openedGroups.filter((f) => f !== id)
      else this.openedGroups = [...this.openedGroups, id]
    },
  },
})
