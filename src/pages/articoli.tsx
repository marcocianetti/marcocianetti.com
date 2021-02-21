import * as React from 'react';
import { graphql } from 'gatsby';
import Master from '../layouts/Master';
import PostList from '../components/PostList';
import Page from '../models/Page';
import PageUtils from '../utils/PageUtils';

type CategoryGroup = {
  fieldValue: string;
};

type Data = {
  posts: {
    edges: Page[];
  };
  categories: {
    group: CategoryGroup[];
  };
};

type Props = {
  path: string;
  data: Data;
};

type State = {
  search: string;
  selectedCategories: string[];
  posts: Page[];
};

export default class ArticlesPage extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      search: '',
      selectedCategories: [],
      posts: props.data.posts.edges,
    };
  }

  private filterPosts = () => {
    const { search, selectedCategories } = this.state;
    const { data } = this.props;

    let posts = data.posts.edges.filter(p =>
      p.node.frontmatter.title.toLowerCase().includes(search.toLowerCase())
    );

    if (selectedCategories.length > 0) {
      posts = posts.filter(
        post =>
          post.node.frontmatter.categories &&
          selectedCategories.every(c => post.node.frontmatter.categories.includes(c))
      );
    }

    this.setState({ posts });
  };

  private handleOnSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      search: event.target.value,
    }, this.filterPosts);
  };

  private handleCategoryClick = (category: CategoryGroup) => () => {
    let selectedCategories = [...this.state.selectedCategories];
    if (selectedCategories.includes(category.fieldValue)) {
      selectedCategories = selectedCategories.filter(c => c !== category.fieldValue);
    } else {
      selectedCategories.push(category.fieldValue);
    }

    this.setState({
      selectedCategories,
    }, this.filterPosts);
  };

  render() {
    const posts = this.state.posts;
    const categories = this.props.data.categories.group;

    return (
      <Master
        metaTags={{
          title: PageUtils.generateTitle('Articoli'),
          description: 'Tra i miei articoli puoi trovare guide sullo sviluppo web, guide sull\'intelligenza artificiale e i miei progetti Open Source',
          path: this.props.path,
        }}
      >
        <div className="container">
          <div>
            <h1>Articoli</h1>

            <div className="blog-page__categories-list">
              {categories.map(c => {
                const isActive = this.state.selectedCategories.includes(c.fieldValue);

                return (
                  <span
                    key={c.fieldValue}
                    onClick={this.handleCategoryClick(c)}
                    className={isActive ? `blog-page__categories-list__item blog-page__categories-list__item--active` : 'blog-page__categories-list__item'}
                  >
                    {c.fieldValue}
                  </span>
                )
              })}
            </div>
          </div>

          <div className="blog-page__search__container">
            <input
              type="text"
              name="search"
              value={this.state.search}
              placeholder="Cerca un articolo..."
              onChange={this.handleOnSearchChange}
              className="text-input"
            />
            <span className="blog-page__search__count">{posts.length}</span>
          </div>

          <section>
            <PostList posts={posts} />
          </section>
        </div>
      </Master>
    );
  }

}

export const pageQuery = graphql`
  query ArticlesQuery {
    posts: allMarkdownRemark(filter: { frontmatter: {  template: { eq: "post" } } }, limit: 2000, sort: { fields: [fields___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt(pruneLength: 180)
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
    categories: allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___categories) {
        fieldValue
        totalCount
      }
    }
  }
`;
