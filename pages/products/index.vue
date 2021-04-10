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
          prepend-inner-icon="mdi-magnify"
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

<script lang="ts" src="./products.ts" />

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
