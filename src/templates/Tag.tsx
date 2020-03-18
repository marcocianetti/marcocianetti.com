import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Master from '../layouts/Master';
import PostList from '../components/PostList';
import Page  from '../models/Page';
import PageUtils from '../utils/PageUtils';

type Data = {
  posts: {
    totalCount: number;
    edges: Page[];
  };
}

type Props = {
  pageContext: {
    tag: string;
  };
  data: Data;
};

export default class Tag extends React.Component<Props> {
  render() {
    const { tag } = this.props.pageContext;
    const posts = this.props.data.posts.edges;

    return (
      <Master>
        <Helmet title={PageUtils.generateTitle(`Articoli taggati "${tag}"`)}>
          <meta name="description" content={`Articoli taggati "${tag}"`}/>
        </Helmet>
        <div className="container">
          <h1>Articoli taggati <u>{tag}</u></h1>
          <PostList posts={posts} />
        </div>
      </Master>
    )
  }
}

export const TagQuery = graphql`
  query PostsByTag($tag: String) {
    posts: allMarkdownRemark(
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            categories
            thumbnail {
              childImageSharp {
                fixed(width: 150, height: 150) {
                    base64
                    width
                    height
                    src
                    srcSet
                  }
              }
            }
            date
            template
          }
        }
      }
    }
  }
`;
