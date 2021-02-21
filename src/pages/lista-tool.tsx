import React from 'react';
import Master from '../layouts/Master';
import LoadingView from '../components/LoadingView';
import Config from '../config/Config';
import StyleUtils from '../utils/StyleUtils';

type Props = {};

type Tool = {
  name: string;
  description: string;
  categories: string[];
  url: string;
};

type Categories = {
  [c: string]: number;
}

function ToolItem(tool: Tool) {
  return (
    <div key={tool.name} className="tools-list-page__tools-list__item">
      <h3 className="tools-list-page__tools-list__item__title">
        {tool.name}
      </h3>
      <div className="tools-list-page__tools-list__item__categories-container">
        {tool.categories.map(c => <span key={c} className="tools-list-page__tools-list__item__category">#{c}</span>)}
      </div>
      <p dangerouslySetInnerHTML={{ __html: tool.description }} className="tools-list-page__tools-list__item__description" />
      <a href={tool.url} target="_blank" className="button button--primary tools-list-page__tools-list__item__button">
        Vai al sito
      </a>
    </div>
  );
}

export default function ToolsListPage(props: Props) {

  const [isLoading, setIsLoading] = React.useState(true);
  const [searchText, setSearchText] = React.useState('');
  const [tools, setTools] = React.useState([] as Tool[]);
  const [categories, setCategories] = React.useState([] as string[]);

  const fetchTools = async () => {
    setIsLoading(true);

    try {
      const res = await fetch(`https://script.google.com/macros/s/AKfycbzrwV6R5iQiOMCDocJmuBes4BE9EZXvvQAW_MJaxvgzVVkXyjc/exec`);
      const jsonRes = await res.json();

      setTools(jsonRes.tools);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value.trim());
  };

  const onCategoryClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    const category = event.currentTarget.id;
    const index = categories.indexOf(category);
    if (index !== -1) {
      setCategories(categories => categories.filter(c => c !== category));
    } else {
      setCategories(c => c.concat(category));
    }
  };

  const getFilteredTools = () => {
    return tools
      .filter(t => {
        if (categories.length === 0) {
          return true;
        }

        return categories.every(c => t.categories.includes(c));
      }).filter(t => {
        if (t.name.toLowerCase().includes(searchText)) {
          return true;
        }

        if (t.categories.join(' ').toLowerCase().includes(searchText)) {
          return true;
        }

        if (t.description.toLowerCase().includes(searchText)) {
          return true;
        }

        return false;
      }).sort((a, b) => a.name.localeCompare(b.name));
  };

  const getCategories = (): Categories => {
    let categories: Categories = {};

    tools.forEach(t => {
      t.categories.forEach(c => {
        if (categories[c]) {
          categories[c] += 1;
        } else {
          categories[c] = 1;
        }
      });
    });

    return categories;
  };

  React.useEffect(() => {
    fetchTools();
  }, []);

  const today = new Date();
  const title = `Lista tool [Ultimo aggiornamento: ${today.getMonth() + 1}/${today.getFullYear()}]`;
  const allCategories = getCategories();

  return (
    <Master
      metaTags={{
        title: `${Config.SiteTitle} | ${title}`,
        description: 'La mia lista di tool che spaziano dal tech al marketing, costruita e sempre in aggiornamento grazie all\'aiuto dei miei colleghi di 247X',
      }}
    >
      <div className="container">
        <h1>{title}</h1>
        <p>Ecco la mia lista di tool che spaziano dal tech al marketing, costruita e sempre in aggiornamento grazie all'aiuto
          dei miei colleghi di <a href="https://247x.io" target="_blank">247X</a> ❤️</p>
        <p>Se vuoi aggiungere il tuo preferito allora scrivimi su <a href="https://www.linkedin.com/in/marcocianetti/" target="_blank">LinkedIn</a>!</p>

        {isLoading
          ?
          <LoadingView className="tools-list-page__loading-view"/>
          :
          <>
            <span className="label">Filtri</span>
            <p>Seleziona le categorie che ti interessano oppure utilizza la barra di ricerca</p>

            <div className="tools-list-page__categories-list">
              {Object.keys(allCategories).sort((a, b) => a.localeCompare(b)).map(c =>
                  <span
                    id={c}
                    key={c}
                    onClick={onCategoryClick}
                    className={StyleUtils.cls('tools-list-page__categories-list__item', categories.includes(c) ? 'tools-list-page__categories-list__item--active' : undefined)}
                  >
              {`${c} (${allCategories[c]})`}
            </span>
              )}
            </div>

            <input
              type="text"
              name="search"
              value={searchText}
              placeholder="Cerca per nome, categoria o descrizione..."
              onChange={onSearchChange}
              className="text-input tools-list-page__search-input"
            />

            <div className="tools-list-page__tools-list">
              {getFilteredTools().map(ToolItem)}
            </div>
          </>
        }
      </div>
    </Master>
  );
}
