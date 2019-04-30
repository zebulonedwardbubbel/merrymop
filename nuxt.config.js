module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Competitive cleaning services in Copenhagen',
    titleTemplate: '%s | Merry Mop',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'A humble team of Copenhagen based cleaning professionals' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  router: {
      middleware: 'pages'
  },
  /*
  ** Customize the progress bar color
  */
  loading: false,
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
    }
  },
  css: [
    // Load a node module directly (here it's a SASS file)
    // SCSS file in the project
    '@/assets/scss/main.scss'
  ]
}
