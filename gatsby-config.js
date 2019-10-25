/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-Config/
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var url_join_1 = __importDefault(require("url-join"));
var Config_1 = __importDefault(require("./src/Config/Config"));
module.exports = {
    /* Your site Config here */
    pathPrefix: Config_1["default"].PathPrefix === '' ? '/' : Config_1["default"].PathPrefix,
    siteMetadata: {
        siteUrl: url_join_1["default"](Config_1["default"].SiteUrl, Config_1["default"].PathPrefix),
        rssMetadata: {
            site_url: url_join_1["default"](Config_1["default"].SiteUrl, Config_1["default"].PathPrefix),
            title: Config_1["default"].SiteTitle,
            description: Config_1["default"].SiteDescription,
            image_url: url_join_1["default"](Config_1["default"].SiteUrl, Config_1["default"].PathPrefix) + "/logos/logo-48.png"
        }
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
                            maxWidth: 850
                        }
                    },
                    {
                        resolve: "gatsby-remark-autolink-headers",
                        options: {
                            offsetY: "100",
                            maintainCase: false,
                            removeAccents: true
                        }
                    },
                    'gatsby-remark-copy-linked-files',
                    'gatsby-remark-prismjs',
                ]
            }
        },
        // Google Tag Manager
        {
            resolve: "gatsby-plugin-google-tagmanager",
            options: {
                id: Config_1["default"].GoogleTagManagerId,
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
                addTagInBody: false
            }
        },
        // Netlify
        {
            resolve: "gatsby-plugin-netlify",
            options: {
                headers: {
                    '/*.js': ['cache-control: public, max-age=31536000, immutable'],
                    '/*.css': ['cache-control: public, max-age=31536000, immutable'],
                    '/sw.js': ['cache-control: public, max-age=0, must-revalidate']
                }
            }
        },
        {
            resolve: 'gatsby-plugin-nprogress',
            options: {
                color: Config_1["default"].ThemeColor
            }
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
                name: Config_1["default"].SiteTitle,
                short_name: Config_1["default"].SiteShortTitle,
                description: Config_1["default"].SiteDescription,
                start_url: Config_1["default"].PathPrefix,
                background_color: Config_1["default"].BackgroundColor,
                theme_color: Config_1["default"].ThemeColor,
                display: 'minimal-ui',
                icons: [
                    {
                        src: '/logo/logo-48.png',
                        sizes: '48x48',
                        type: 'image/png'
                    },
                    {
                        src: '/logo/logo-1024.png',
                        sizes: '1024x1024',
                        type: 'image/png'
                    },
                ]
            }
        },
        // Pages
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'pages',
                path: __dirname + "/content/pages/"
            }
        },
        // Posts
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'posts',
                path: __dirname + "/content/posts/"
            }
        },
        // Thumbnails
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'thumbnails',
                path: __dirname + "/content/thumbnails/"
            }
        },
    ]
};
