import React from 'react';
import StyleUtils from '../../utils/StyleUtils';

type Props = {
  className?: string;
};

type Page = {
  name: string;
  description: string;
  url: string;
};

const pages: Page[] = [
  {
    name: 'Lista tool',
    description: 'La mia lista di tool che spaziano dal tech al marketing, costruita e sempre in aggiornamento grazie all\'aiuto dei miei colleghi di 247X',
    url: 'lista-tool',
  }
];

export default function PageList(props: Props) {
  return (
    <div className={StyleUtils.cls('page-list', props.className)}>
      {pages.map(p => (
        <a key={p.url} href={p.url} className="page-list__item">
          <p className="page-list__item__name">{p.name}</p>
          <p className="page-list__item__description">{p.description}</p>
        </a>
      ))}
    </div>
  );
}
