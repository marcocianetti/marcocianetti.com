import React, { Component } from 'react'
import ThemeContext from '../context/ThemeContext'
import Helmet from 'react-helmet'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import config from '../../data/SiteConfig'
import favicon from '../images/favicon.png'
import '../styles/main.scss'

class MainLayout extends Component {
  static contextType = ThemeContext;

  render() {
    const { dark, notFound } = this.context;
    const { children } = this.props;

    return (
      <>
        <Helmet
          htmlAttributes={{ lang: 'it' }}
          bodyAttributes={{
            class: `theme ${dark && !notFound ? 'dark' : '' || notFound ? 'not-found' : ''}`,
          }}
        >
          <meta name="description" content={config.siteDescription} />
          <link rel="shortcut icon" type="image/png" href={favicon} />
        </Helmet>
        <NavBar links={config.navBarLinks} />
        <main id="main-content">{children}</main>
        <Footer />
      </>
    )
  }
}

export default MainLayout
