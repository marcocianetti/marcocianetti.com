import * as React from 'react';
import Helmet from 'react-helmet';
import mushroom from '../images/super-mario/mushroom.jpg';
import logo from '../images/logo-256.png';
import Config from '../config/Config';
import '../styles/main.scss';

export default class NotFoundPage extends React.Component {

  componentDidMount() {
    window.addEventListener('keyup', this.handleOnKeyUp);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleOnKeyUp);
  }

  private handleOnKeyUp = (event: KeyboardEvent) => {
    if (event.key && (event.key === 'Escape' || event.key === 'Esc' || event.key === 'Enter')) {
      window.location.replace('/');
    }
  };

  render() {
    return (
      <>
        <Helmet htmlAttributes={{ lang: Config.SiteLanguage }}>
          <meta name="description" content={Config.SiteDescription}/>
          <link rel="shortcut icon" type="image/png" href={logo}/>
        </Helmet>

        <div className="not-found-page">
          <header>
            <div className="not-found-page__header__container container">
              <div className="not-found-page__score">
                <a href="/">Marco</a>
                <span>122700</span>
              </div>

              <div className="not-found-page__score">
                <span>World</span>
                <span>3-4</span>
              </div>

              <div className="not-found-page__score">
                <span>Time</span>
                <span>404</span>
              </div>

            </div>
          </header>

          <div className="not-found-page__wall" />
          <div className="not-found-page__wall not-found__wall--translated" />

          <main>
            <div className="container">
              <h1>Thank you Mario!</h1>
              <h1>But the page you are looking for is at another URL!</h1>
              <h1><a href="/">Press Start</a> or <a href="/">Click Here</a></h1>
            </div>
          </main>

          <img src={mushroom} alt="Toad, personaggio del videogioco Super Mario" />

          <div className="not-found-page__wall" />
          <div className="not-found-page__wall not-found__wall--translated" />
          <div className="not-found-page__wall" />
        </div>
      </>
    );
  }

}
