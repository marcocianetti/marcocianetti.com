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
    category: string;
  };
  data: Data;
};

export default class Category extends React.Component<Props> {
  render() {
    const { category } = this.props.pageContext;
    const posts = this.props.data.posts.edges;

    return (
      <Master>
        <Helmet title={PageUtils.generateTitle(`Articoli nella categoria "${category}"`)} />
        <div className="container">
          <h1>
            Categoria <u>{category}</u>
          </h1>
          <PostList posts={posts} />
        </div>
      </Master>
    )
  }
}

export const CategoryQuery = graphql`
  query PostsByCategory($category: String) {
    posts: allMarkdownRemark(
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { categories: { in: [$category] } } }
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
