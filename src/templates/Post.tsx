import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Master from '../layouts/Master';
import PostAuthorSection from '../components/PostAuthorSection';
import TagList from '../components/TagList';
import ReadingBar from '../components/ReadingBar';
import PostGitHubSection from '../components/PostGitHubSection';
import { PageNode } from '../models/Page';
import DateUtils from '../utils/DateUtils';
import SocialUtils from '../utils/SocialUtils';

type Data = {
  post: PageNode;
}

type Props = {
  pageContext: {
    slug: string;
  };
  data: Data;
};

export default class Post extends React.Component<Props> {
  render() {
    const node = this.props.data.post;
    const iconStyle = {
      height: '1em',
      width: '0.875em',
      verticalAlign: '-0.125em',
    };

    const image = node.frontmatter.thumbnail ? getImage(node.frontmatter.thumbnail) : undefined;

    return (
      <Master
        metaTags={{
          page: node,
          pageType: 'post'
        }}
        footerClassName="post-template__footer"
      >
        <ReadingBar />

        <div className="container">
          <article>
            <header className={image ? 'post-template__header' : 'post-template__header post-template__header--no-thumbnail'}>
              {image && <GatsbyImage image={image} alt={node.frontmatter.title} title={node.frontmatter.title} className="post-template__header__thumbnail" />}

              <div className="flex flex--column">
                <h1>{node.frontmatter.title}</h1>

                <div className="post-template__meta">
                  <time className="post-template__meta__date">
                    <FontAwesomeIcon icon={['fas', 'calendar-alt']} style={iconStyle} /> {DateUtils.format(node.fields.date)}
                  </time>
                  <span className="post-template__meta__ttr">
                    <FontAwesomeIcon icon={['fas', 'book-reader']} style={iconStyle} /> {node.timeToRead} min
                  </span>
                  <span className="post-template__meta__share">
                    <FontAwesomeIcon icon={['fas', 'share-alt']} style={iconStyle} /> Condividi su
                    <a title="Condividi su LinkedIn" href={SocialUtils.getLinkedInShareLink(node)} className="post-template__meta__link">
                      <FontAwesomeIcon icon={['fab', 'linkedin']} style={iconStyle} />
                    </a>
                    <a title="Condividi su Twitter" href={SocialUtils.getTwitterShareLink(node)} className="post-template__meta__link">
                      <FontAwesomeIcon icon={['fab', 'twitter-square']} style={iconStyle} />
                    </a>
                    <a title="Condividi su Facebook" href={SocialUtils.getFacebookShareLink(node)} className="post-template__meta__link">
                      <FontAwesomeIcon icon={['fab', 'facebook-square']} style={iconStyle} />
                    </a>
                  </span>
                </div>

                <TagList tags={node.frontmatter.tags || []} />
              </div>
            </header>

            <div dangerouslySetInnerHTML={{ __html: node.html || '' }} className="page"/>

            <PostGitHubSection post={node} />
          </article>
        </div>

        <PostAuthorSection />
      </Master>
    )
  }
}

export const PostQuery = graphql`
  query PostBySlug($slug: String!) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      fields {
        date
        slug
      }
      frontmatter {
        title
        description
        template
        categories
        tags
        thumbnail {
          childImageSharp {
              gatsbyImageData
            }
        }
      }
    }
  }
`;
