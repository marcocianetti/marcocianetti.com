module.exports = {
  trailingSlash: 'never',

  siteMetadata: {
    siteUrl: 'https://marcocianetti.com/',
    rssMetadata: {
      site_url: 'https://marcocianetti.com/',
      title: 'Marco Cianetti',
      description:
        'Marco Cianetti è un web developer di Roma, specializzato in JavaScript e appassionato di Intelligenza Artificiale. Ricopre la posizione di Full-Stack Developer @247X - Il tuo Team di Crescita Dedicato.',
      image_url: 'https://marcocianetti.com/logos/logo-48.png',
    },
  },

  flags: {
    // DEV_SSR: true
  },

  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: false,

  plugins: [
    // Resolver for src folder
    'gatsby-plugin-resolve-src',

    // Typescript
    'gatsby-plugin-typescript',

    // Sass
    'gatsby-plugin-sass',

    // Head meta data
    'gatsby-plugin-react-helmet',

    // Markdown transformer
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 800,
              quality: 100,
              showCaptions: true,
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: `100`,
              maintainCase: false,
              removeAccents: true,
            },
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-prismjs',
          {
            resolve: 'gatsby-remark-auto-link-new-window',
            options: {},
          },
        ],
      },
    },

    // Google Tag Manager
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: 'GTM-NZW3R4T',

        // Include GTM in development.
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false,

        // Specify optional GTM environment details.
        // gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIROMENT_AUTH_STRING",
        // gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIROMENT_PREVIEW_NAME",
        // dataLayerName: "YOUR_DATA_LAYER_NAME",

        // Whether to put the GTM script into the <head> (as suggested by Google)
        // or append it to the <body> (making it non-blocking).
        // Defaults to false meaning GTM will be added in the <head> (again, as suggested by Google).
        // addTagInBody: false
      },
    },

    // Netlify
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        headers: {
          '/*.js': [
            'cache-control: public, max-age=31536000, immutable',
          ],
          '/*.css': [
            'cache-control: public, max-age=31536000, immutable',
          ],
          '/sw.js': [
            'cache-control: public, max-age=0, must-revalidate',
          ],
        },
      },
    },

    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: '#1b62ff',
      },
    },

    // Images
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-image',

    // Local links
    'gatsby-plugin-catch-links',

    // Sitemap
    'gatsby-plugin-sitemap',

    // Manifest
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Marco Cianetti',
        short_name: 'Marco Cianetti',
        description:
          'Marco Cianetti è un web developer di Roma, specializzato in JavaScript e appassionato di Intelligenza Artificiale. Ricopre la posizione di Full-Stack Developer @247X - Il tuo Team di Crescita Dedicato.',
        start_url: '/',
        background_color: '#fff',
        theme_color: '#1b62ff',
        display: 'minimal-ui',
        icons: [
          {
            src: '/logo/logo-48.png',
            sizes: '48x48',
            type: 'image/png',
          },
          {
            src: '/logo/logo-1024.png',
            sizes: '1024x1024',
            type: 'image/png',
          },
        ],
      },
    },

    // Pages
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/content/pages/`,
      },
    },

    // Posts
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/content/posts/`,
      },
    },
  ],
};
