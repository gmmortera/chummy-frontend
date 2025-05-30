// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@nuxt/ui'
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
  tailwindcss: {
    cssPath: '~/assets/css/main.css'
  }
})