import colors from 'vuetify/es5/util/colors'

export default {
  env: {
    BASE_API: process.env.BASE_API,
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - RGuide-frontend',
    title: 'RGuide - Лучший 3D справочник технического оборудования',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'theme-color',
        name: 'theme-color',
        content: '#272727',
      },
      {
        hid: 'description',
        name: 'description',
        content:
          'Лучший 3D справочник технического оборудования для технических специалистов и образовательный учреждений.',
      },
      {
        hid: 'og:title',
        name: 'og:title',
        content: 'RGuide - Лучший 3D справочник технического оборудования.',
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content:
          'Лучший 3D справочник технического оборудования для технических специалистов и образовательный учреждений.',
      },
      {
        hid: 'og:image',
        name: 'og:image',
        content: '/icon.png',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.BASE_API + '/api/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'ru',
      theme_color: '#272727',
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  server: {
    host: '0.0.0.0',
  },
}
