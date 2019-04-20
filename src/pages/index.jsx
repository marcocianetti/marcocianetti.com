import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Layout from '../layout'
import SEO from '../components/SEO'
import config from '../../data/SiteConfig'

class Index extends Component {
  render() {
    return (
      <Layout>
        <Helmet title={`${config.siteTitle} - Web Developer`} />
        <SEO />
        <div className="container">
          <div className="lead">
            <h1>
              Ciao, sono Marco Cianetti<br />Web Developer specializzato in JavaScript
            </h1>
            <p>Sviluppo principalmente siti web in <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">ReactJS</a>, realizzo script in JavaScript e automazioni di vario genere.</p>
            <p>Grazie a <a href="https://247x.io" target="_blank" rel="noopener noreferrer">247X</a> ho sposato la <strong>metodologia lean</strong> e messo <strong>l'analisi dei dati</strong> di fronte a tutto.</p>
          </div>
        </div>

        <div className="container">
          <section className="section">
            <h2>Feedback</h2>
            <p>Questo sito è ancora in fase di sviluppo, se hai qualche idea o feedback al riguardo scrivimi su:</p>
            <ul>
              <li>
                <strong>LinkedIn</strong>:{' '}
                <a target="_blank" href="https://www.linkedin.com/in/marco-cianetti/" rel="noopener noreferrer">
                  marco-cianetti
                </a>
              </li>
              <li>
                <strong>Email</strong>: <a href="mailto:cianetti.m@gmail.com">cianetti.m@gmail.com</a>
              </li>
            </ul>
          </section>
        </div>
      </Layout>
    )
  }
}

export default Index
