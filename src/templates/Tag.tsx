import { graphql } from 'gatsby';
import React from 'react';
import PostList from '../components/PostList';
import Master from '../layouts/Master';
import Page from '../models/Page';
import PageUtils from '../utils/PageUtils';

type Data = {
  posts: {
    totalCount: number;
    edges: Page[];
  };
};

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
      <Master
        metaTags={{
          title: PageUtils.generateTitle(`Articoli taggati "${tag}"`),
          description: `Articoli taggati "${tag}"`,
        }}
      >
        <div className="container">
          <h1>
            Articoli taggati <u>{tag}</u>
          </h1>
          <PostList posts={posts} />
        </div>
      </Master>
    );
  }
}

export const TagQuery = graphql`
  query PostsByTag($tag: String) {
    posts: allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt
          timeToRead
          fields {
            slug
            date
          }
          frontmatter {
            title
            tags
            template
            thumbnail {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  }
`;
