import React, { Component } from 'react'
import { Link } from 'gatsby'
import sun from '../images/sun.svg'
import moon from '../images/moon.svg'
import ThemeContext from '../context/ThemeContext'
import config from '../../data/SiteConfig';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrolled: false,
    };
  }

  navOnScroll = () => {
    if (window.scrollY > 20) {
      this.setState({ scrolled: true })
    } else {
      this.setState({ scrolled: false })
    }
  };

  componentDidMount() {
    window.addEventListener('scroll', this.navOnScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.navOnScroll)
  }

  render() {
    const { scrolled } = this.state;
    const { menuLinks } = this.props;

    return (
      <ThemeContext.Consumer>
        {theme => (
          <nav className={scrolled ? 'nav scroll' : 'nav'}>
            <div className="nav-container">
              <div className="brand">
                <Link to="/">
                  <span className="text">{config.siteTitle}</span>
                </Link>
              </div>
              <div className="links">
                {menuLinks.map(link => (
                  <Link key={link.name} to={link.link}>
                    {link.name}
                  </Link>
                ))}
                <div className="cta">
                  <button className="dark-switcher" onClick={theme.toggleDark}>
                    {theme.dark ? (
                      <span>
                        <img src={sun} className="theme-icon" />
                      </span>
                    ) : (
                      <span>
                        <img src={moon} className="theme-icon" />
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

export default Navigation
