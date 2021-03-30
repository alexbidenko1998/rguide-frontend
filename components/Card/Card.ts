import Vue, { PropType } from 'vue'
import { ProductType } from '~/types/products'

export default Vue.extend({
  name: 'Card',

  props: {
    product: {
      type: Object as PropType<ProductType>,
      required: true,
    },
  },

  data: () => ({
    baseImageURL: `${process.env.BASE_API}/files/previews/`,
    show: false,
  }),
})
