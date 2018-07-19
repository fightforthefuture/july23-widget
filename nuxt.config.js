module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Battle for the Net',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      // { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  modules: [
    'nuxt-sass-resources-loader'
  ],
  sassResources: [
    '~/assets/css/_variables.scss'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }

      config.module.rules.push({
        test: /\.(yaml|yml)$/,
        loader: 'json-loader!yaml-loader'
      })

      if (!isDev) {
        config.externals = {
          'showdown': 'showdown'
        }
      }
    },
  },

  vendor: [
    'axios',
    'babel-polyfill'
  ],

  babel: {
    presets: [
      ['vue-app', {
          useBuiltIns: true,
          targets: { ie: 9, uglify: true }
        }
      ]
    ]
  },

  plugins: [
    { src: '~/plugins/widget-options.js', ssr: false },
    { src: '~/plugins/analytics.js', ssr: false },
    '~/plugins/i18n.js',
    '~/plugins/org-rotation.js',
    '~/plugins/filters.js',
  ]
}
