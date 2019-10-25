import * as React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Master from '../layouts/Master';
import SeoHelmet from '../components/SeoHelmet';
import { PageNode } from '../models/Page';
import PageUtils from '../utils/PageUtils';

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
    const { slug } = this.props.pageContext;
    const node = this.props.data.markdownRemark;

    return (
      <Master>
        <Helmet>
          <title>{PageUtils.generateTitle(node.frontmatter!.title!)}</title>
        </Helmet>
        <SeoHelmet page={{ path: slug, node: node, type: 'page' }} />

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
      frontmatter {
        title
        template
      }
      fields {
        slug
        date
      }
    }
  }
`;
