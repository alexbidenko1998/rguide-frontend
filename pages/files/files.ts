import Vue from 'vue'

export default Vue.extend({
  data: () => ({
    file: null as File | null,
    productId: '',
    type: '',
    filename: '',
  }),

  methods: {
    changeFile(v: Event) {
      this.file = (v.target as HTMLInputElement).files![0]
    },
    upload() {
      if (!this.file) return
      const fd = new FormData()
      fd.append('file', this.file)
      fd.append('type', this.type)
      fd.append('productId', this.productId)
      this.$axios
        .$post<{ filename: string }>('products/file', fd)
        .then((r) => {
          alert('success')
          this.filename = r.filename
        })
        .catch(() => alert('Что-то пошло не так, пиши мне или ищи ошибку'))
    },
  },
})
