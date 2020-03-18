import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Project from '../../models/Project';

type Props = {
  projects: Project[];

  className?: string;
};

export default function ProjectList(props: Props) {
  return (
    <div className='project-list'>
      {props.projects.map(p => (
        <a
          key={p.name}
          href={p.url}
          title={p.name + ' - ' + p.description}
          target='_blank'
          className='project-list__item'
        > 
          <div className='project-list__item__name-container'>
            <span className='project-list__item__icon'>{p.icon}</span>
            <h2 className='project-list__item__name'>{p.name}</h2>

            <span className='project-list__github-label'>
                <FontAwesomeIcon icon={['fab', 'github']} />
                GitHub
            </span>
          </div>

          <p className='project-list__item__description'>{p.description}</p>
        </a>
      ))}
    </div>
  );
}
