import * as React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Master from '../layouts/Master';
import PostList from '../components/PostList';
import ProjectList from '../components/ProjectList';
import Page from '../models/Page';
import Config from '../config/Config';
import projects from '../data/projects';
import marco from '../images/marco-cianetti-512px.jpg';

type Data = {
  latestPosts: {
    edges: Page[];
  };
};

type Props = {
  data: Data;
};

export default class IndexPage extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <Master>
        <Helmet
          title={`${Config.SiteTitle} | Web Developer specializzato in Javascript`}
        />

        <div className='index-page__container container'>
          <div className='index-page__heading'>
            <div className='index-page__text-container'>
              <h1 className='index-page__title'>
                Ciao, sono
                <br />
                Marco Cianetti
              </h1>
              <h2 className="index-page__subtitle">Web Developer di Roma specializzato in JavaScript</h2>
            </div>

            <img src={marco} className='index-page__author-card' />
          </div>

          <p>
            Sviluppo principalmente siti web in{' '}
            <a
              title='Sito web di ReactJS'
              href='https://reactjs.org/'
              target='_blank'
              rel='noopener noreferrer'
            >
              ReactJS
            </a>{' '}
            e sono appassionato di <strong>Intelligenza Artificiale</strong>.
          </p>
          <p>
            Con{' '}
            <a
              title='Sito web di 247X - Il tuo Team di Crescita Dedicato'
              href='https://247x.io'
              target='_blank'
            >
              247X - Il tuo Team di Crescita Dedicato
            </a>{' '}
            ho fatto della <strong>Metodologia Lean</strong> e dell'
            <strong>Analisi dei Dati</strong> il mio mantra.
          </p>
          <p>
            Tra i miei articoli troverai:
          </p>
          <ul>
            <li>Guide sullo Sviluppo Web;</li>
            <li>Guide sull'Intelligenza Artificiale;</li>
            <li>I miei progetti Open Source.</li>
          </ul>
        </div>

        <section className='index-page__section container'>
          <h2 className="index-page__section-title">Ultimi articoli</h2>
          <PostList posts={this.props.data.latestPosts.edges} dense />
        </section>

        <section className='index-page__section container'>
          <h2 className="index-page__section-title">Progetti Open Source</h2>
          <ProjectList projects={projects} />
        </section>
      </Master>
    );
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    latestPosts: allMarkdownRemark(
      limit: 5
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            categories
            thumbnail {
              childImageSharp {
                fixed(width: 150, height: 150) {
                  base64
                  width
                  height
                  src
                  srcSet
                }
              }
            }
            date
            template
          }
        }
      }
    }
  }
`;
