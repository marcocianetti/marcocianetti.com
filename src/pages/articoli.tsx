import { graphql } from 'gatsby';
import * as React from 'react';
import PostList from '../components/PostList';
import Master from '../layouts/Master';
import Page from '../models/Page';
import PageUtils from '../utils/PageUtils';

type TagGroup = {
  fieldValue: string;
  totalCount: number;
};

type Data = {
  posts: {
    edges: Page[];
  };
  tags: {
    group: TagGroup[];
  };
};

type Props = {
  path: string;
  data: Data;
};

type State = {
  search: string;
  selectedTags: string[];
  posts: Page[];
};

export default class ArticlesPage extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);

    this.state = {
      search: '',
      selectedTags: [],
      posts: props.data.posts.edges,
    };
  }

  private filterPosts = () => {
    const { search, selectedTags } = this.state;
    const { data } = this.props;

    let posts = data.posts.edges.filter((p) =>
      p.node.frontmatter.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    if (selectedTags.length > 0) {
      posts = posts.filter(
        (post) =>
          post.node.frontmatter.tags &&
          selectedTags.every((c) =>
            post.node.frontmatter.tags.includes(c)
          )
      );
    }

    this.setState({ posts });
  };

  private handleOnSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState(
      {
        search: event.target.value,
      },
      this.filterPosts
    );
  };

  private handleTagClick = (tag: TagGroup) => () => {
    let selectedTags = [...this.state.selectedTags];
    if (selectedTags.includes(tag.fieldValue)) {
      selectedTags = selectedTags.filter((c) => c !== tag.fieldValue);
    } else {
      selectedTags.push(tag.fieldValue);
    }

    this.setState(
      {
        selectedTags,
      },
      this.filterPosts
    );
  };

  render() {
    const posts = this.state.posts;
    const tags = this.props.data.tags.group;

    return (
      <Master
        metaTags={{
          title: PageUtils.generateTitle('Articoli'),
          description:
            "Tra i miei articoli puoi trovare guide sullo sviluppo web, guide sull'intelligenza artificiale e i miei progetti Open Source",
          path: this.props.path,
        }}
      >
        <div className="container">
          <div>
            <h1>Articoli</h1>

            <div className="blog-page__categories-list">
              {tags.map((c) => {
                const isActive = this.state.selectedTags.includes(
                  c.fieldValue
                );

                return (
                  <span
                    key={c.fieldValue}
                    onClick={this.handleTagClick(c)}
                    className={
                      isActive
                        ? `blog-page__categories-list__item blog-page__categories-list__item--active`
                        : 'blog-page__categories-list__item'
                    }
                  >
                    {c.fieldValue} ({c.totalCount})
                  </span>
                );
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
            <span className="blog-page__search__count">
              {posts.length}
            </span>
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
    posts: allMarkdownRemark(
      filter: { frontmatter: { template: { eq: "post" } } }
      limit: 2000
      sort: { fields: { date: DESC } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 180)
          timeToRead
          fields {
            date
            slug
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
    tags: allMarkdownRemark(limit: 2000) {
      group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
        totalCount
      }
    }
  }
`;
