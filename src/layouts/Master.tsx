import * as React from 'react';
import Helmet from 'react-helmet';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Config from '../config/Config';
import IconUtils from '../utils/IconUtils';
import logo from '../images/logo-256.png';
import '../styles/main.scss';

type Props = {
  navBarClassName?: string;
  mainClassName?: string;
  footerClassName?: string;
};

IconUtils.initLibrary();

export default class Master extends React.Component<Props> {
  render() {
    const { navBarClassName, mainClassName, footerClassName, children } = this.props;

    return (
      <>
        <Helmet htmlAttributes={{ lang: Config.SiteLanguage }}>
          <meta name="description" content={Config.SiteDescription}/>
          <link rel="shortcut icon" type="image/png" href={logo}/>
        </Helmet>

        <NavBar links={Config.NavBarLinks} className={navBarClassName} />
        
        <main className={mainClassName ? `master-layout__main ${mainClassName}` : `master-layout__main`}>
          {children}
        </main>
        
        <Footer className={footerClassName} />
      </>
    )
  }
}
