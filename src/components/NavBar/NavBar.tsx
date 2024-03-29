import React from 'react';
import { Link } from 'gatsby';
import { debounce } from 'lodash';

import ThemeToggle from 'components/ThemeToggle';
import Config from 'config/Config';

import logo from 'images/logo-256.png';

type NavBarLink = {
  name: string;
  url: string;
};

type Props = {
  links: NavBarLink[];

  className?: string;
};

const NavBar = ({ links, className }: Props) => {

  const [hasScrolled, setHasScrolled] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = debounce(() => {
    setHasScrolled(window.scrollY > 20);
  }, 100);

  let cN = `nav-bar__floating`;
  if (hasScrolled) {
    cN += ` nav-bar--is-scrolled`;
  }
  if (className) {
    cN += ` ${className}`;
  }

  return (
    <nav className="nav-bar">
      <div className={cN}>
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
      </div>
    </nav>
  );
}

export default NavBar;