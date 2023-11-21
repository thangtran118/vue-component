import { fileURLToPath } from 'node:url'
import { isDevelopment } from 'std-env'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/google-fonts',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    'nuxt-icon',
    '@nuxt/image',
  ],
  experimental: {
    payloadExtraction: false,
    inlineSSRStyles: false,
    renderJsonPayloads: true,
  },
  alias: {
    '@scss': fileURLToPath(new URL('./assets/scss/', import.meta.url)),
  },
  css: [
    '~/assets/css/global.css',
  ],
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width,initial-scale=1,viewport-fit=cover',
      htmlAttrs: { lang: 'en' },
      bodyAttrs: {
        class: 'overflow-x-hidden',
      },
      meta: [
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
    },
  },
  googleFonts: {
    families: {
      Roboto: true,
    },
    display: 'swap',
  },
  typescript: {
    strict: true,
  },
  sourcemap: isDevelopment,
  devtools: { enabled: true },
})
