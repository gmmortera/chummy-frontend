// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  colorMode: 'system',
  components: [{
    path: '~/components',
    pathPrefix: false
  }],
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
      baseApiUrl: ''
    }
  },
  ssr: true
})