import React, { Component } from 'react'
import { Link } from 'gatsby'
import sun from '../images/sun.svg'
import moon from '../images/moon.svg'
import logo from '../images/favicon.png'
import ThemeContext from '../context/ThemeContext'
import config from '../../data/SiteConfig';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrolled: false,
    };
  }

  handleScroll = () => {
    if (window.scrollY > 20) {
      this.setState({ scrolled: true })
    } else {
      this.setState({ scrolled: false })
    }
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  render() {
    const { scrolled } = this.state;
    const { links } = this.props;

    return (
      <ThemeContext.Consumer>
        {theme => (
          <nav className={scrolled ? 'nav scroll' : 'nav'}>
            <div className="nav-container">
              <div className="brand">
                <Link to="/">
                  <img src={logo} className="favicon" alt="Logo Marco Cianetti" />
                  <span className="text">{config.siteTitle}</span>
                </Link>
              </div>
              <div className="links">
                {links.map(link => (
                  <Link key={link.name} to={link.link} activeClassName="active">
                    {link.name}
                  </Link>
                ))}
                <div className="cta">
                  <button className="dark-switcher" aria-label="theme mode switch" onClick={theme.toggleDark}>
                    {theme.dark ? (
                      <span>
                        <img src={sun} className="theme-icon" alt="light theme icon" />
                      </span>
                    ) : (
                      <span>
                        <img src={moon} className="theme-icon" alt="dark theme icon" />
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </nav>
        )}
      </ThemeContext.Consumer>
    )
  }
}

export default NavBar;
