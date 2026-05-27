import * as React from 'react';
import SeoHead from '../components/SeoHelmet';
import PageUtils from '../utils/PageUtils';
import mushroom from '../images/super-mario/mushroom.jpg';
import '../styles/main.scss';

export function Head({ location }: { location: { pathname: string } }) {
  return (
    <SeoHead
      title={PageUtils.generateTitle('Pagina non trovata')}
      description="La pagina che cerchi non è a questo URL"
      path={location.pathname}
    />
  );
}

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
