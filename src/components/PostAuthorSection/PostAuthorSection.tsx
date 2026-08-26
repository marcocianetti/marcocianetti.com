import React, { Component } from 'react';
import marco from '../../images/marco-cianetti-256px.jpg';

export default class PostAuthorSection extends Component {
  render() {
    return (
      <aside className="post-author-section">
        <div className="post-author-section__container container">
          <div className="post-author-section__card">
            <img 
              src={marco} 
              alt="Marco Cianetti" 
              title="Marco Cianetti"
              className="post-author-section__avatar"
            />
            
            <div className="post-author-section__text-container">
              <p className="post-author-section__text">
                Sono Marco Cianetti, uno sviluppatore Web di Roma specializzato in JavaScript, 
                sviluppo principalmente siti web in <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer nofollow">ReactJS</a> e sono appassionato di <strong>Intelligenza Artificiale</strong>.
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
