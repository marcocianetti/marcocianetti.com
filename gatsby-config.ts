/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-Config/
 */

import urljoin from 'url-join';
import Config from './src/config/Config';

module.exports = {
  /* Your site Config here */

  pathPrefix: Config.PathPrefix === '' ? '/' : Config.PathPrefix,

  siteMetadata: {
    siteUrl: urljoin(Config.SiteUrl, Config.PathPrefix),
    rssMetadata: {
      site_url: urljoin(Config.SiteUrl, Config.PathPrefix),
      title: Config.SiteTitle,
      description: Config.SiteDescription,
      image_url: `${urljoin(Config.SiteUrl, Config.PathPrefix)}/logos/logo-48.png`,
    },
  },

  plugins: [

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
              maxWidth: 850,
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
        ],
      },
    },

    // Google Tag Manager
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: Config.GoogleTagManagerId,

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
        addTagInBody: false,
      },
    },

    // Netlify
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        headers: {
          '/*.js': ['cache-control: public, max-age=31536000, immutable'],
          '/*.css': ['cache-control: public, max-age=31536000, immutable'],
          '/sw.js': ['cache-control: public, max-age=0, must-revalidate'],
        },
      },
    },

    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: Config.ThemeColor,
      },
    },

    // Images
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',

    // Local links
    'gatsby-plugin-catch-links',

    // Sitemap
    'gatsby-plugin-sitemap',

    // Manifest
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: Config.SiteTitle,
        short_name: Config.SiteShortTitle,
        description: Config.SiteDescription,
        start_url: Config.PathPrefix,
        background_color: Config.BackgroundColor,
        theme_color: Config.ThemeColor,
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

  ],
};
