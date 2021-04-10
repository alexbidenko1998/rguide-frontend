<template>
  <div>
    <input
      v-model="productId"
      type="text"
      placeholder="Product id"
      style="background-color: white"
    />
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

<script lang="ts" src="./files.ts" />
