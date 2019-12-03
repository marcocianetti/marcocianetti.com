import * as React from 'react';
import Config from '../../config/Config';

type Props = {
  className?: string;
};

export default class Footer extends React.Component<Props> {
  render() {
    return (
      <footer className={this.props.className ? `footer ${this.props.className}` : `footer`}>
        <div className="footer__links-container container">
          <a title="Profilo LinkedIn di Marco Cianetti" href={`https://it.linkedin.com/in/${Config.LinkedInUser}`} target="_blank" className="footer__link">
            LinkedIn
          </a>
          <a title="Profilo GitHub di Marco Cianetti" href={`https://github.com/${Config.GitHubUser}`} target="_blank" className="footer__link">
            GitHub
          </a>
          <a title="Repository GitHub del sito personale di Marco Cianetti" href={Config.GitHubRepository} target="_blank" className="footer__link">
            Source
          </a>
        </div>
      </footer>
    )
  }
}
