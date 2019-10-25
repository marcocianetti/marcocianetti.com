import * as React from 'react';
import Config from '../../config/Config';

export default class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer__links-container container">
          <a href={`https://it.linkedin.com/in/${Config.LinkedInUser}`} target="_blank" rel="noopener noreferrer" className="footer__link">
            LinkedIn
          </a>
          <a href={`https://github.com/${Config.GitHubUser}`} target="_blank" rel="noopener noreferrer" className="footer__link">
            GitHub
          </a>
          <a href={Config.GitHubRepository} target="_blank" rel="noopener noreferrer" className="footer__link">
            Source
          </a>
        </div>
      </footer>
    )
  }
}
