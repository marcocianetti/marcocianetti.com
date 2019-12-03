import * as React from 'react';
import { graphql, Link } from 'gatsby';
import Helmet from 'react-helmet';
import Master from '../layouts/Master';
import SeoHelmet from '../components/SeoHelmet';
import PageUtils from '../utils/PageUtils';
import RouteUtils from '../utils/RouteUtils';

type CategoryGroup = {
  fieldValue: string;
  totalCount: number;
};

type Data = {
  categories: {
    group: CategoryGroup[];
  };
};

type Props = {
  data: Data;
};

export default class CategoriesPage extends React.Component<Props> {
  render() {
    const { data } = this.props;

    return (
      <Master>
        <SeoHelmet />
        <Helmet title={PageUtils.generateTitle('Categorie')} />
        <div className="container">
          <h1>Categorie</h1>

          <div className="categories-page__categories-list">
            {data.categories.group.map(c => (
              <Link to={RouteUtils.generatePathToCategory(c.fieldValue)} key={c.fieldValue}>
                <span>
                  {c.fieldValue} <strong>{c.totalCount}</strong>
                </span>
              </Link>
            ))}
          </div>

        </div>
      </Master>
    )
  }
}

export const pageQuery = graphql`
  query CategoriesQuery {
    categories: allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___categories) {
        fieldValue
        totalCount
      }
    }
  }
`;
