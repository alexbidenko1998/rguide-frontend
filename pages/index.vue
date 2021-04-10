<template>
  <v-container style="position: relative; min-height: 100%">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <div class="text-center">
          <logo />
          <vuetify-logo />
        </div>
        <v-card>
          <v-card-title class="headline">Welcome to RGuide</v-card-title>
          <v-card-text>
            <p>Лучший 3D справочник радиодеталей и электронных компонентов.</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              nuxt
              to="/products"
              aria-label="Перейти к изучению"
              >Начать изучение</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default Vue.extend({
  components: {
    Logo,
    VuetifyLogo,
  },
})
</script>
