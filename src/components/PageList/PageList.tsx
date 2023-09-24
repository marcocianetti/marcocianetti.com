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
    name: '📊 Unfair Analytics',
    description:
      "Il 1 Luglio 2024 perderai l'accesso ai tuoi dati storici di Google Analytics Universal. Con 247X puoi salvarli e visualizzarli in una dashboard personalizzata per il tuo business",
    url: 'https://247x.io/servizi/unfair-analytics?ref=marcocianetti.com',
  },
  {
    name: '🛠️ I miei tool preferiti',
    description:
      "La mia lista di tool che spaziano dal tech al marketing, costruita e sempre in aggiornamento grazie all'aiuto dei miei colleghi di 247X",
    url: 'lista-tool',
  },
];

export default function PageList(props: Props) {
  return (
    <div className={StyleUtils.cls('page-list', props.className)}>
      {pages.map((p) => (
        <a key={p.url} href={p.url} className="page-list__item">
          <p className="page-list__item__name">{p.name}</p>
          <p className="page-list__item__description">
            {p.description}
          </p>
        </a>
      ))}
    </div>
  );
}
