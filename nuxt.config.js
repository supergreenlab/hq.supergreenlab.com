import path from 'path'
import fs from 'fs'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'hq.supergreenlab.com',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'stylesheet', href: 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,600' }
    ]
  },

  router: {
    middleware: 'auth',
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/global.css',
    'vue-slick-carousel/dist/vue-slick-carousel.css',
    'vue-slick-carousel/dist/vue-slick-carousel-theme.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~plugins/vue-select.js', ssr: false },
    { src: '~plugins/infinite-loading.js', ssr: false },
    { src: '~plugins/vue-slick-carousel.js', ssr: false },
    { src: '~/plugins/chart.js', mode: 'client', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [{
    path: '~/components',
    pathPrefix: false,
  }],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'nuxt-client-init-module',
    'portal-vue/nuxt',
    ['@nuxtjs/recaptcha', {
      mode: 'base',
      siteKey: process.env.RECAPTCHA_KEY || '6Lc4abcmAAAAAPRQ1EAYfqjm5phbDGSbqefX1EXx',
      version: 2
    }],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  env: {
    API_URL: process.env.API_URL || 'https://api2.supergreenlab.com',
    SKIP_CAPTCHA_TOKEN: process.env.SKIP_CAPTCHA_TOKEN || '',
  },

  server: process.env.NODE_ENV !== 'production' ? {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'dev.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'dev.crt'))
    }
  } : {}
}
