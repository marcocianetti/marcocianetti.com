import React, { Component } from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import moment from 'moment';
import Page from 'models/Page';
import DateUtils from '../../utils/DateUtils';

type Props = {
  posts: Page[];

  dense?: boolean;
};

export default class PostList extends Component<Props> {

  render() {
    return (
      <div className="post-list">
        {this.props.posts.map(post => {
          const thumbnail = post.node.frontmatter.thumbnail
            ? post.node.frontmatter.thumbnail.childImageSharp.fixed
            : undefined;

          const isPopular = (post.node.frontmatter.categories || []).includes('Popular');

          // TODO: Check date field
          const isNewest = moment(post.node.frontmatter.date) > moment().subtract(1, 'months');

          return (
            <Link
              key={post.node.fields.slug}
              to={post.node.fields.slug}
              className={this.props.dense ? 'post-list__item post-list__item--dense' : 'post-list__item'}
            >
              <div className="post-list__item__container">
                {thumbnail ? <Img fixed={thumbnail} className="post-list__item__thumbnail" /> : null}

                <div>
                  <h2 className="post-list__item__name">{post.node.frontmatter.title}</h2>
                  {
                    !this.props.dense
                      ? <div className="post-list__item__date">
                          {DateUtils.format(post.node.frontmatter.date)}
                        </div>
                      : null
                  }
                </div>

                {isNewest && (
                  <div className="post-list__item__badge post-list__item__badge--new">
                    <span>🤩 Nuovo</span>
                  </div>
                )}

                {isPopular && !this.props.dense && !isNewest && (
                  <div className="post-list__item__badge post-list__item__badge--popular">
                    <span>😎 Popolare</span>
                  </div>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    )
  }

}
