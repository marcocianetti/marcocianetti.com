import * as React from 'react';
import marco from '../../images/marco-cianetti-256px.jpg';

type Props = {
  className?: string;
};

export default function AuthorCard(props: Props) {
  return (
    <div
      className={
        props.className
          ? `author-card__avatar-container ${props.className}`
          : 'author-card__avatar-container'
      }
    >
      <div className='author-card__avatar-background-container'>
        <div className='author-card__avatar-background'>
          <img
            src={marco}
            alt="Marco Cianetti"
            title="Marco Cianetti"
            className='author-card__avatar'
          />
        </div>
      </div>
    </div>
  );
}
