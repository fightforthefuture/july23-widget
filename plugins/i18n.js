import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default ({ app, isDev }) => {
  // TODO: make these auto-reload in dev
  const messages = require('~/assets/data/strings.json')

  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: messages
  })
}
