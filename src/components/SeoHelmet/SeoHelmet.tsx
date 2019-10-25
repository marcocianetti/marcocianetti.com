import * as React from 'react';
import Helmet from 'react-helmet';
import urljoin from 'url-join';
import { PageNode } from '../../models/Page';
import Config from '../../config/Config';

type Props = {
  page?: {
    node: PageNode;
    path: string;
    type: 'page' | 'post';
  };
};

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

export default class SeoHelmet extends React.Component<Props> {

  render() {
    const { page } = this.props;
    let title = Config.SiteTitle;
    let description = Config.SiteDescription;
    let image = Config.SiteLogo;
    let url = urljoin(Config.SiteUrl, Config.PathPrefix);

    // Page or blog post from Markdown
    if (page) {
      const pageMeta = page.node.frontmatter!;

      // Title
      title = pageMeta.title!;

      // Description
      if (pageMeta.description) {
        description = pageMeta.description;
      } else if (page.node.excerpt) {
        description = page.node.excerpt;
      }

      // Image
      if (pageMeta.thumbnail && pageMeta.thumbnail.childImageSharp && pageMeta.thumbnail.childImageSharp.fixed && !(pageMeta.thumbnail.childImageSharp.fixed instanceof Array) && pageMeta.thumbnail.childImageSharp.fixed.src) {
        image = pageMeta.thumbnail.childImageSharp.fixed.src;
      }

      url = urljoin(Config.SiteUrl, Config.PathPrefix, page.path);
    }

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
    if (page && page.type === 'post') {
      const pageMeta = page.node.frontmatter!;

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

      if (pageMeta.date) {
        postSchema.datePublished = pageMeta.date;
      }

      if (pageMeta.updated) {
        postSchema.dateModified = pageMeta.updated;
      }

      schemas.push(postSchema);
    }

    return (
      <Helmet>
        <meta name="description" content={description} />
        <meta name="image" content={image} />

        <script type="application/ld+json">{JSON.stringify(schemas)}</script>

        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        {page && page.type === 'post' && <meta property="og:type" content="article" />}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content={Config.TwitterUser} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Helmet>
    );
  }

}
