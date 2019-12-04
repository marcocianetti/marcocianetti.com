import React, { Component } from 'react';
import marco from '../../images/marco-cianetti.jpg';

export default class PostAuthorSection extends Component {
  render() {
    return (
      <aside className="post-author-section">
        <div className="post-author-section__container container">
          <div className="post-author-section__card">
            <img 
              src={marco} 
              alt="Marco Cianetti nell'ufficio di 247X" 
              title="Marco Cianetti nell'ufficio di 247X"
              className="post-author-section__avatar"
            />
            
            <div className="post-author-section__text-container">
              <p className="post-author-section__text">
                Sono Marco Cianetti, uno sviluppatore Web di Roma specializzato in JavaScript, 
                sviluppo principalmente siti web in <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">ReactJS</a> e sono appassionato di <strong>Intelligenza Artificiale</strong>.
              </p>
              <p className="post-author-section__text">
                Attualmente ricopro il ruolo di Full-Stack Developer presso <a href="https://247x.io/" target="_blank">247X - Il tuo Team di Crescita Dedicato</a>.
              </p>
              <p className="post-author-section__text">
                Vuoi restare aggiornato sui miei articoli?
              </p>
              <a href="https://linkedin.com/in/marcocianetti" target="_blank" className="button button--primary post-author-section__button">Seguimi su LinkedIn</a>
            </div>
          </div>
        </div>
      </aside>
    )
  }
}
