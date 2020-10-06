import * as React from 'react';
import { graphql, Link } from 'gatsby';
import Master from '../layouts/Master';
import PageUtils from '../utils/PageUtils';
import RouteUtils from '../utils/RouteUtils';

type TagGroup = {
  fieldValue: string;
  totalCount: number;
};

type Data = {
  tags: {
    group: TagGroup[];
  };
};

type Props = {
  path: string;
  data: Data;
};

export default class TagsPage extends React.Component<Props> {
  render() {
    const { data } = this.props;

    return (
      <Master
        metaTags={{
          title: PageUtils.generateTitle('Tag'),
          description: 'Lista dei tag dei miei articoli. Seleziona il tag che più ti interessa e leggi gli articoli ad esso correlati.',
          path: this.props.path,
        }}
      >
        <div className="container">
          <h1>Tag</h1>

          <div className="tags-page__tags-list">
            {data.tags.group.map(t => (
              <Link to={RouteUtils.generatePathToTag(t.fieldValue)} key={t.fieldValue}>
                <span>
                  {t.fieldValue} <strong>{t.totalCount}</strong>
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
  query TagsQuery {
    tags: allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
