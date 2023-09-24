import Config from 'config/Config';
import { getSrc } from 'gatsby-plugin-image';
import logo from 'images/logo-256.png';
import MetaTags from 'models/MetaTags';
import React from 'react';
import Helmet from 'react-helmet';
import urljoin from 'url-join';
import PageUtils from 'utils/PageUtils';

type Props = MetaTags;

type Schema = {
  '@context'?: string;
  '@type'?: string;

  mainEntityOfPage?: {
    '@type'?: string;
    '@id'?: string;
  };

  author?: {
    '@type'?: string;
    name?: string;
  };

  publisher?: {
    '@type'?: string;
    name?: string;
    image?: {
      '@type'?: 'ImageObject';
      url?: string;
    };
    logo?: {
      '@type'?: 'ImageObject';
      url?: string;
    };
  };

  url?: string;
  name?: string;
  description?: string;
  headline?: string;
  alternateName?: string;
  datePublished?: string;
  dateModified?: string;

  image?: {
    '@type'?: string;
    url?: string;
  };

  itemListElement?: {
    '@type'?: string;
    position?: number;
    item?: {
      '@id'?: string;
      name?: string;
      image?: string;
    };
  }[];
};

class SeoHelmet extends React.Component<Props> {
  render() {
    const { page, pageType } = this.props;
    let title = this.props.title || Config.SiteTitle;
    let description =
      this.props.description || Config.SiteDescription;
    let image = Config.SiteLogo;
    let url = urljoin(Config.SiteUrl, Config.PathPrefix);
    let path = this.props.path;
    const urlParts = [Config.SiteUrl];

    // Page or blog post from Markdown
    if (page) {
      const pageMeta = page.frontmatter!;

      // Title
      title = PageUtils.generateTitle(pageMeta.title!);

      // Description
      if (pageMeta.description) {
        description = pageMeta.description;
      } else if (page.excerpt) {
        description = page.excerpt;
      }

      // Image
      if (pageMeta.thumbnail && pageMeta.thumbnail) {
        const imageSrc = getSrc(pageMeta.thumbnail);
        if (imageSrc) {
          image = imageSrc;
        }
      }

      // Path
      path = page.fields.slug;
      if (path && !path.startsWith(Config.PathPrefix)) {
        urlParts.push(Config.PathPrefix);
      }
    }

    if (path) {
      urlParts.push(path);
    }

    url = urljoin(urlParts);

    image = urljoin(Config.SiteUrl, image);
    const siteUrl = urljoin(Config.SiteUrl, Config.PathPrefix);
    const schemas: Schema[] = [
      {
        '@context': 'http://schema.org',
        '@type': 'WebSite',
        url: siteUrl,
        name: title,
        alternateName: Config.SiteAltTitle ? Config.SiteAltTitle : '',
      },
      {
        '@context': 'http://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@id': url,
              name: title,
              image,
            },
          },
        ],
      },
    ];

    // Add blog post snippets
    if (page && pageType === 'post') {
      const pageMeta = page.frontmatter!;

      const postSchema: Schema = {
        '@context': 'http://schema.org',
        '@type': 'BlogPosting',

        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': url,
        },

        author: {
          '@type': 'Person',
          name: Config.Author,
        },

        publisher: {
          '@type': 'Organization',
          name: Config.Publisher,
          image: {
            '@type': 'ImageObject',
            url: image,
          },
          logo: {
            '@type': 'ImageObject',
            url: image,
          },
        },

        url: siteUrl,
        name: title,
        alternateName: Config.SiteAltTitle ? Config.SiteAltTitle : '',
        headline: title,
        image: {
          '@type': 'ImageObject',
          url: image,
        },
        description,
      };

      if (page.fields.date) {
        postSchema.datePublished = page.fields.date;
      }

      if (pageMeta.updated) {
        postSchema.dateModified = pageMeta.updated;
      }

      schemas.push(postSchema);
    }

    return (
      <Helmet
        title={title}
        htmlAttributes={{ lang: Config.SiteLanguage }}
      >
        <link rel="shortcut icon" type="image/png" href={logo} />

        <meta name="description" content={description} />
        <meta name="image" content={image} />

        <script type="application/ld+json">
          {JSON.stringify(schemas)}
        </script>

        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        {pageType === 'post' && (
          <meta property="og:type" content="article" />
        )}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content={Config.TwitterUser} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />

        <link rel="canonical" href={url} />
      </Helmet>
    );
  }
}

export default SeoHelmet;
