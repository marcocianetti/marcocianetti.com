import * as React from 'react';
import { Link } from 'gatsby';
import { ThemeProvider } from '../../context/ThemeContext';
import ThemeToggle from '../../components/ThemeToggle';
import Config from '../../config/Config';
import logo from '../../images/logo-256.png';

type NavBarLink = {
  name: string;
  url: string;
};

type Props = {
  links: NavBarLink[];

  className?: string;
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
    const { links, className } = this.props;

    let cN = `nav-bar`;
    if (hasScrolled) {
      cN += ` nav-bar--is-scrolled`;
    }

    if (className) {
      cN += ` ${className}`;
    }

    return (
      <ThemeProvider>
        <nav className={cN}>
          <div className="nav-bar__container">

            <div className="nav-bar__brand">
              <Link title="Home page" to="/" className="nav-bar__brand__link">
                <img src={logo} alt="Logo di Marco Cianetti" className="nav-bar__brand__logo" />
                <span className="nav-bar__brand__text">{Config.SiteTitle}</span>
              </Link>
            </div>

            <div className="nav-bar__links-container">
              {links.map(l => (
                <Link key={l.name} title={`Pagina ${l.name}`} to={l.url} activeClassName="active" className="nav-bar__links-container__link">
                  {l.name}
                </Link>
              ))}

              <ThemeToggle className="nav-bar__links-container__link" />
            </div>

          </div>
        </nav>
      </ThemeProvider>
    );
  }

}
