// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    '@pinia/nuxt',
    '@nuxt/image',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxtjs/i18n',
    '@element-plus/nuxt',
    '@vueuse/nuxt'
  ],
  googleFonts: {
    families: {
      // 指定您想要的字體
      Roboto: true,
      'Open+Sans': true
    }
  },
  app: {
    head: {
      link: [{ rel: 'stylesheet', href: '//at.alicdn.com/t/c/font_2496178_w89g22ga59.css' }],
      //<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" >
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no'
        }
      ]
    }
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  runtimeConfig: {
    myProxyUrl: 'http://localhost:3001/'
  },
  devServer: {
    port: 8080
  },
  i18n: {
    strategy: 'prefix_and_default', // 添加路由前缀的方式
    locales: ['en', 'zh', 'ja'], //配置语种
    defaultLocale: 'en', // 默认语种
    vueI18n: './i18n.config.ts' // 通过vueI18n配置
  }
  // vite: {
  //   css: {
  //     preprocessorOptions: {
  //       scss: {
  //         additionalData: `@use "@/assets/scss/element/index.scss" as element;`
  //       }
  //     }
  //   }
  // },
  // elementPlus: {
  //   icon: 'ElIcon'
  // }
})
