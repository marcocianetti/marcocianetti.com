import * as React from 'react';
import { Link } from 'gatsby';
import Config from '../../config/Config';
import logo from '../../images/logo-256.png';

type NavBarLink = {
  name: string;
  url: string;
};

type Props = {
  links: NavBarLink[];
};

type State = {
  hasScrolled: boolean;
};

export default class NavBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      hasScrolled: false,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  private handleScroll = () => {
    this.setState({
      hasScrolled: window.scrollY > 20
    });
  };

  render() {
    const { hasScrolled } = this.state;
    const { links } = this.props;

    return (
      <nav className={hasScrolled ? `nav-bar nav-bar--is-scrolled` : "nav-bar"}>
        <div className="nav-bar__container">

          <div className="nav-bar__brand">
            <Link to="/" className="nav-bar__brand__link">
              <img src={logo} alt="Logo di Marco Cianetti" className="nav-bar__brand__logo" />
              <span className="nav-bar__brand__text">{Config.SiteTitle}</span>
            </Link>
          </div>

          <div className="nav-bar__links-container">
            {links.map(l => (
              <Link key={l.name} to={l.url} activeClassName="active" className="nav-bar__links-container__link">
                {l.name}
              </Link>
            ))}
          </div>

        </div>
      </nav>
    );
  }

}
