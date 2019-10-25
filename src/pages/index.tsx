import * as React from 'react';
import Helmet from 'react-helmet';
import Master from '../layouts/Master';
import Page from '../models/Page';
import Config from '../config/Config';

type Data = {
  latestPosts: {
    edges: Page[];
  };
};

type Props = {
  data: Data;
}

export default class IndexPage extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <Master>
        <Helmet title={`${Config.SiteTitle} | ${Config.SiteDescription}`} />

        <div className="container">
          <div>
            <h1 className="index-page__title">
              Ciao, sono Marco
            </h1>
            <p>Web Developer di Roma specializzato in JavaScript.</p>
            <p>Sviluppo principalmente siti web in <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">ReactJS</a> e sono appassionato di <strong>Intelligenza Artificiale</strong>.</p>
            <p>Con <a href="https://247x.io" target="_blank" rel="noopener noreferrer">247X - Il tuo Team di Crescita Dedicato</a> ho fatto della <strong>Metodologia Lean</strong> e dell'<strong>Analisi dei Dati</strong> il mio mantra.</p>
          </div>
        </div>
      </Master>
    );
  }

}
