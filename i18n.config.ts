import en from './lang/en.json'
import zh from './lang/zh.json'
// import ja from './lang/ja.json'

export default defineI18nConfig(() => ({
  legacy: false, // 是否兼容之前
  fallbackLocale: 'en', // 区配不到的语言就用en
  messages: {
    en,
    zh
    // ja: ja,
  }
}))
