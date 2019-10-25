import React, { Component } from 'react';
import marco from '../../images/marco-cianetti.jpg';

export default class AuthorInfo extends Component {
  render() {
    return (
      <aside className="author-info">
        <div className="author-info__card container">
          <img className="author-info__avatar" src={marco} alt="Marco Cianetti nell'ufficio di 247X" />
          <div>
            <p className="author-info__text">
              Sono Marco, uno sviluppatore Web specializzato in JavaScript.
              Sviluppo principalmente siti web in <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">ReactJS</a>.
              <br />
              <br />
              Nel tempo libero mi dedico allo studio dell'<strong>Intelligenza Artificiale</strong>.
            </p>
          </div>
        </div>
      </aside>
    )
  }
}
