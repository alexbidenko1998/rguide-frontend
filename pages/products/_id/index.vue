<template>
  <v-container style="position: relative; min-height: 100%">
    <v-row v-if="product" class="detailPage pt-8">
      <v-col xl="6" cols="12" style="display: flex">
        <v-card class="detailPage__modelCard">
          <div
            ref="container"
            style="width: 100%; border-radius: 4px; overflow: hidden"
          />
        </v-card>
      </v-col>
      <v-col xl="6" cols="12">
        <v-card>
          <v-card-title>{{ product.title }}</v-card-title>
          <v-card-text>{{ product.description }}</v-card-text>
          <v-divider />
          <v-card-text style="white-space: pre-wrap">{{
            product.specification.replace(/\\r?\\n/g, '\n')
          }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" src="./productDetail.ts" />

<style lang="scss">
.detailPage {
  min-height: 60vh;

  & &__modelCard {
    width: 100%;
    display: flex;
    min-height: 60vh;
  }

  @media (min-width: 1904px) {
    min-height: 80vh;

    &__modelCard {
      min-height: 80vh;
    }
  }
}
</style>
