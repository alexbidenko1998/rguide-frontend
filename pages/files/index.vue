<template>
  <div>
    <input
      v-model="type"
      type="text"
      placeholder="preview or model"
      style="background-color: white"
    />
    <input type="file" @change="changeFile" />
    <button @click="upload">Сохранить</button>
    {{ filename }}
  </div>
</template>

<script>
export default {
  data: () => ({
    file: null,
    type: '',
    filename: '',
  }),

  methods: {
    changeFile(v) {
      this.file = v.target.files[0]
    },
    upload() {
      const fd = new FormData()
      fd.append('file', this.file)
      fd.append('type', this.type)
      this.$axios
        .$post('products/file', fd)
        .then((r) => {
          alert('success')
          this.filename = r.filename
        })
        .catch(() => alert('Что-то пошло не так, пиши мне или ищи ошибку'))
    },
  },
}
</script>
