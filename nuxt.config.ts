// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Chummy'
    }
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  colorMode: 'system',
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@pinia/nuxt'
  ],
  css: ['~/assets/css/main.css'],
  eslint: {
    config: {
      stylistic: {
        indent: 'tab',
        quotes: 'single',
        quoteProps: 'as-needed',
        arrowParens: true,
        semi: true
      }
    }
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.CHUMMY_BACKEND_BASEURL
    }
  }
})