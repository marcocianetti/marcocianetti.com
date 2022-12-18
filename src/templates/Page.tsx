import * as React from 'react';
import { graphql } from 'gatsby';
import Master from '../layouts/Master';
import { PageNode } from '../models/Page';

type Props = {
  pageContext: {
    slug: string;
  };
  data: {
    markdownRemark: PageNode;
  }
};

export default class Page extends React.Component<Props> {
  render() {
    const node = this.props.data.markdownRemark;

    return (
      <Master
        metaTags={{
          page: node,
          pageType: 'page',
        }}
      >

        <div className="container">
          <article>
            <header>
              <h1>{node.frontmatter!.title}</h1>
            </header>
            <div dangerouslySetInnerHTML={{ __html: node.html || '' }} className="page"/>
          </article>
        </div>
      </Master>
    )
  }
}

export const PageQuery = graphql`
  query PageBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      fields {
        slug
        date
      }
      frontmatter {
        title
        template
      }
    }
  }
`;
