export default defineNuxtConfig({
  compatibilityDate: '2026-01-01',
  runtimeConfig: {
    cometApiToken: '',
    cometUrl: 'https://cms-una.gt.tc',
    cometWorkspace: 'cms-una'
  },
  app: {
    head: {
      title: 'Best Books Ever',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Catálogo Best Books Ever alimentado desde Comet CMS.'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Source+Sans+3:wght@400;600;700&display=swap'
        },
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css' },
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css' },
        { rel: 'stylesheet', href: '/css/site.css' }
      ]
    }
  }
})
