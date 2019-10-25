import * as React from 'react';
import { Link } from 'gatsby';
import kebabCase from 'lodash.kebabcase';

type Props = {
  tags: string[];
};

export default class TagList extends React.Component<Props> {
  render() {
    const { tags } = this.props;

    return (
      <div className="tag-list">
        {tags.map(tag => (
          <Link key={tag} to={`/tag/${kebabCase(tag)}`} className="tag-list__item">
            <span>{tag}</span>
          </Link>
        ))}
      </div>
    );
  }
}
