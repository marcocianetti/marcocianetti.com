import * as React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Master from '../layouts/Master';
import SeoHelmet from '../components/SeoHelmet';
import PostAuthorSection from '../components/PostAuthorSection';
import TagList from '../components/TagList';
import ReadingBar from '../components/ReadingBar';
import PostGitHubSection from '../components/PostGitHubSection';
import { PageNode } from '../models/Page';
import PageUtils from '../utils/PageUtils';
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
    const { slug } = this.props.pageContext;
    const node = this.props.data.post;
    const hasThumbnail = node.frontmatter.thumbnail !== undefined;
    const iconStyle = {
      height: '1em',
      width: '0.875em',
      verticalAlign: '-0.125em',
    };

    return (
      <Master footerClassName="post-template__footer">
        <Helmet>
          <title>{PageUtils.generateTitle(node.frontmatter!.title!)}</title>
        </Helmet>

        <SeoHelmet page={{ path: slug, node: node, type: 'page' }} />

        <ReadingBar />

        <div className="container">
          <article>
            <header className={hasThumbnail ? 'post-template__header' : 'post-template__header post-template__header--no-thumbnail'}>
              {hasThumbnail && <Img fixed={node.frontmatter.thumbnail!.childImageSharp!.fixed!} className="post-template__header__thumbnail" />}

              <div className="flex flex--column">
                <h1>{node.frontmatter.title}</h1>

                <div className="post-template__meta">
                  <time className="post-template__meta__date">
                    <FontAwesomeIcon icon={['fas', 'calendar-alt']} style={iconStyle} /> {DateUtils.format(node.frontmatter.date)}
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
      frontmatter {
        title
        template
        categories
        tags
        thumbnail {
              childImageSharp {
                  fixed(width: 800) {
                    base64
                    width
                    height
                    src
                    srcSet
                  }
                }
            }
      }
      fields {
        slug
        date
      }
    }
  }
`;
