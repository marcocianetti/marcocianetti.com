import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import SeoHead from '../components/SeoHelmet';
import Config from '../config/Config';
import marco from '../images/marco-cianetti-512px.jpg';
import Master from '../layouts/Master';

type Experience = {
  role: string;
  place: string;
  period: string;
  description?: string;
  highlights?: string[];
};

type Education = {
  title: string;
  place: string;
  grade: string;
  period: string;
  description?: string;
};

type SkillsGroup = {
  name: string;
  skills: string[];
};

type Language = {
  name: string;
  level: string;
  percentage: number;
};

// TODO: contenuto mock, sostituire con i dati reali del CV.
const experiences: Experience[] = [
  {
    role: 'Funzionario Tecnico Informatico',
    place: 'Ministero della Difesa',
    period: 'Lug 2026 — Oggi',
    description:
      'Gestione di progetti di digitalizzazione dell\'Ente e dei processi tecnologici interni, con l\'obiettivo di realizzare servizi moderni e fruibili, e di introdurre metodologie agili e strumenti già consolidati nel mondo startup.',
    highlights: [
      'Coordinamento di team tecnici su progetti di digitalizzazione',
      'Ottimizzazione di processi interni',
      'Analisi e progettazione della UI e della UX degli applicativi',
    ],
  },
  {
    role: 'Co-Founder & Full-Stack Developer',
    place: '247 Growth s.r.l.',
    period: '2018 — 2026',
    description:
      'Co-founder dell\'azienda, gestione dei progetti digitali e di crescita dei clienti, sviluppo di prodotti e servizi digitali.',
    highlights: [
      'Project manager e sviluppo di progetti tecnologici',
      'Realizzazione di sistemi di tracciamento e visualizzazione dati',
      'Realizzazione di esperimenti di crescita',
      'Ideazione e sviluppo di prodotti innovativi tecnologici, anche basati su AI'
    ],
  },
  {
    role: 'Sviluppatore ReactJS & Android',
    place: 'Quokka s.r.l.',
    period: '2015 — 2018',
    description:
      'Sviluppatore web e mobile dei vari prodotti realizzati',
    highlights: [
      'Sviluppatore Android per la realizzazione del Geo Social Network Quokka, che ha raccolto +$150.000 di investimenti',
      'Sviluppatore React Native & CDO per la realizzazione del Geo Social Network Razmataz',
      'Sviluppatore React Native & CDO per l\'applicazione Set Point'
    ]
  },
  {
    role: 'Sviluppatore web',
    place: 'Exervice s.r.l.',
    period: 'Lug 2014 — Dic 2014',
    description:
      'La mia prima esperienza lavorativa come stagista col ruolo di sviluppatore web per sistemi interni',
    highlights: [
      'Sviluppo di un sistema di report automatico',
    ]
  },
];

const education: Education[] = [
  {
    title: 'Laurea Magistrale in Informatica',
    place: 'Università di Roma Tor Vergata',
    grade: '110 / 110 e Lode',
    period: '2016 — 2018',
    description:
      'Tesi su un algoritmo per la guida di un laser nella realizzazione di modelli in metallo.',
  },
  {
    title: 'Laurea Triennale in Informatica',
    place: 'Università di Roma Tor Vergata',
    grade: '110 / 110 e Lode',
    period: '2013 — 2016',
    description:
      'Tesi su un classificatore di recensioni Amazon vere/false basato su Intelligenza Artificiale.',
  },
  {
    title: 'Diploma in Elettronica e Telecomunicazioni',
    place: 'I.T.I.S. Galileo Galilei, Roma',
    grade: '100 / 100',
    period: '2008 — 2013',
    description: 'Come progetto per la maturità ho realizzato un sistema che permette di conteggiare le auto che transitano in un parcheggio, indicando i posti disponibili e occupati su un display.',
  },
];

const skillsGroups: SkillsGroup[] = [
  {
    name: 'Front-End Development',
    skills: [
      'TypeScript',
      'JavaScript',
      'ReactJS',
      'Responsive Design',
      'Sass / SCSS',
      'Jest',
      'GraphQL',
      'SSG (Static Site Generators)',
      'SSR (Server Side Rendering)',
      'A/B Testing',
      'NextJS',
      'UI & UX',
    ],
  },
  {
    name: 'Back-End Development',
    skills: [
      'NodeJS',
      'Rest API Design',
      'MVC',
      'CRUD Operations',
      'ExpressJS',
      'JWT',
      'OAuth2',
      'Hashing',
      'GCP (Google Cloud Platform)',
      'Docker',
      'Database SQL / NoSQL',
      'CI / CD',
      'Redis',
      'Automations',
    ],
  },
  {
    name: 'Project Management',
    skills: ['Agile', 'Scrum', 'Kanban', 'Lean Principles', 'Sprint Planning'],
  },
  {
    name: 'Intelligenza Artificiale',
    skills: ['Machine Learning', 'Prompt Engineering', 'Conversational Bots'],
  },
  {
    name: 'Data Tracking & Visualization',
    skills: [
      'Google Tag Manager',
      'Google Analytics',
      'Google Looker Studio',
      'Client Side Tracking',
      'Server Side Tracking',
      'Website Optimization',
      'Technical SEO',
    ],
  },
  {
    name: 'Business Development',
    skills: [
      'Identificazione nuove opportunità di business',
      'Lead generation',
      'Funnel di vendita',
      'Gestione CRM',
      'Analisi Product-Market fit',
      'Analisi KPI e metriche di crescita',
      'Data-driven decision making',
      'Customer discovery',
      'Costruzione MVP per validazione rapida',
      'Stakeholder management',
      'Presentazioni e pitching',
      'Gestione clienti e account management',
      'OKR (Objectives & Key Results)',
    ],
  },
];

const languages: Language[] = [
  { name: 'Italiano', level: 'Madrelingua', percentage: 100 },
  { name: 'Inglese', level: 'Professionale', percentage: 80 },
];

export function Head() {
  return (
    <SeoHead
      title={`${Config.SiteTitle} | Curriculum Vitae`}
      description="Curriculum di Marco Cianetti, Sviluppatore Web specializzato in JavaScript e Intelligenza Artificiale."
    />
  );
}

export default function CvPage() {
  return (
    <Master>
      <div className="container">
        <header className="cv-page__hero">
          <img src={marco} className="cv-page__hero__photo" alt="Marco Cianetti" />

          <div className="cv-page__hero__text-container">
            <h1 className="cv-page__hero__title">Marco Cianetti</h1>
            <h2 className="cv-page__hero__subtitle">
              Sviluppatore Web specializzato in JavaScript e Intelligenza Artificiale
            </h2>

            <div className="cv-page__hero__contacts">
              <span className="cv-page__hero__contact">
                <FontAwesomeIcon icon={['fas', 'location-dot']} />
                Roma, Italia
              </span>
              <span className="cv-page__hero__contact">
                <FontAwesomeIcon icon={['fas', 'envelope']} />
                <a href="mailto:hello@marcocianetti.com">hello@marcocianetti.com</a>
              </span>
            </div>

            <div className="cv-page__hero__actions">
              <a
                href="/media/cv-marco-cianetti.pdf"
                download="CV Marco Cianetti.pdf"
                className="button button--primary cv-page__hero__download"
              >
                <FontAwesomeIcon icon={['fas', 'download']} />
                Scarica il CV completo in PDF
              </a>
            </div>
          </div>
        </header>


        <section className="cv-page__section">
          <blockquote>
            <p>Sono una persona che da valore al tempo, sia al proprio che a quello degli altri, quindi ti lascio un <strong>breve estratto informale del mio CV</strong> così potrai capire che tipo di persona sono e se ha senso per te continuare a leggere e contattarmi oppure no. Ci vediamo in fondo alla pagina?</p>
          </blockquote>

          <p>Sono uno di quei <strong>nerd secchioni</strong> che amano l'Informatica e <strong>creare cose</strong> con essa, ma non aspettarti un informatico tipico, anzi, tutt'altro.</p>
          <span className='cv-page__section-separator code'>• FORMAZIONE</span>
          <p>Nonostante il mio <strong>diploma in Elettronica e Telecomunicazioni ottenuto col massimo dei voti</strong>, ho sempre saputo che la mia strada sarebbe stata quella del mondo informatico. Quindi, preso il diploma, ho subito intrapreso il percorso di <strong>Laurea in Informatica</strong> - Triennale e Magistrale - a Tor Vergata, ottenute <strong>entrambe con lode</strong> senza mai andare fuori corso.</p>
          <span className='cv-page__section-separator code'>• ESPERIENZA</span>
          <p>Nel 2015, ancora durante la Magistrale, ho iniziato a lavorare per una <strong>startup che fabbricava prodotti</strong> ad una velocità degna della Silicon Valley (<a title='Articolo de "Il Messaggero" su Quokka Geo Social Network' href="https://www.ilmessaggero.it/tecnologia/hitech/quokka_geo_social_network_app_sviluppata_giovani_romani-1323650.html" target="_blank" rel="noopener noreferrer">come questo</a>). In quella startup mi sono guadagnato molto spazio fino ad essere considerato uno dei <strong>co-founder</strong>. In poco più di due anni <strong>ho imparato così tanto che basterebbe per una vita intera</strong>.</p>
          <p>Nel 2018, con lo stesso team, abbiamo <strong>fondato un'azienda per aiutare altre startup a crescere</strong> (<a title='Sito web di 247X' href="https://247x.io/" target="_blank" rel="noopener noreferrer">questa</a>). Dato il nostro portamento tecnologico abbiamo sempre continuato a <strong>creare strumenti tecnologici</strong> che potessero essere d'aiuto ai nostri processi interni, ai nostri clienti o che potessero essere dei veri e propri servizi.</p>
          <p>Nel 2026, <strong>dopo essere diventato papà</strong>, ho capito che le energie che dedicavo alla mia azienda avrei dovuto dedicarle alla mia famiglia. Per questo motivo ho deciso di intraprendere una nuova avventura lavorativa al <strong>Ministero della Difesa</strong> come <strong>Funzionario Tecnico Informatico</strong>, ruolo che tutt'ora ricopro.</p>
          <span className='cv-page__section-separator code'>• RUOLI</span>
          <p>Lavorando in team contenuti ho ricoperto <strong>decine di posizioni diverse</strong>, tutte in grado di insegnarmi qualcosa di nuovo. Ho collaborato con clienti e fornitori di ogni tipo, e <strong>gestito progetti</strong> di ogni ordine di grandezza e ambizione.</p>
          <p>Questo percorso orizzontale è ciò che mi ha reso un <strong>informatico atipico</strong>, in grado di spaziare da <strong>Analisi Dati</strong> alla progettazione di <strong>UI/UX</strong>, dal <strong>Customer Development</strong> allo <strong>sviluppo Full-Stack</strong> di un'applicazione Web o Mobile.</p>
          <span className='cv-page__section-separator code'>• CONCLUSIONE</span>
          <p>Sul fronte personale ti è sufficiente sapere che: amo l'ordine e la precisione, il design, l'AI, <strong>le cose fatte per bene</strong> e il caffè.</p>
          <p>Per il resto, se vuoi scoprire di più su di me, continua pure a leggere e se hai domande <strong>scrivimi</strong> pure! 👋🏻</p>
        </section>

        <section className="cv-page__section">
          <h2 className="cv-page__section-title">
            <FontAwesomeIcon icon={['fas', 'briefcase']} />
            Esperienza
          </h2>

          <div className="cv-page__timeline">
            {experiences.map((experience) => (
              <div className="cv-page__timeline__item" key={`${experience.role}-${experience.place}`}>
                <span className="cv-page__timeline__item__period">{experience.period}</span>
                <h3 className="cv-page__timeline__item__title">{experience.role}</h3>
                <div className='cv-page__timeline__item__place-container'>
                  <span className="cv-page__timeline__item__place">{experience.place}</span>
                </div>

                {experience.description && (
                  <p className="cv-page__timeline__item__description">{experience.description}</p>
                )}

                {experience.highlights && (
                  <ul className="cv-page__timeline__item__list">
                    {experience.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="cv-page__section">
          <h2 className="cv-page__section-title">
            <FontAwesomeIcon icon={['fas', 'graduation-cap']} />
            Formazione
          </h2>

          <div className="cv-page__timeline">
            {education.map((item) => (
              <div className="cv-page__timeline__item" key={item.title}>
                <span className="cv-page__timeline__item__period">{item.period}</span>
                <h3 className="cv-page__timeline__item__title">{item.title}</h3>
                <div className='cv-page__timeline__item__place-container'>
                  <span className="cv-page__timeline__item__place">{item.grade} · {item.place}</span>
                </div>

                {item.description && (
                  <p className="cv-page__timeline__item__description">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="cv-page__section">
          <h2 className="cv-page__section-title">
            <FontAwesomeIcon icon={['fas', 'code']} />
            Competenze
          </h2>

          {skillsGroups.map((group) => (
            <div className="cv-page__skills-group" key={group.name}>
              <span className="cv-page__skills-group__title">{group.name}</span>
              <div className="cv-page__skills-group__list">
                {group.skills.map((skill) => (
                  <span className="cv-page__skill" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="cv-page__section">
          <h2 className="cv-page__section-title">
            <FontAwesomeIcon icon={['fas', 'language']} />
            Lingue
          </h2>

          <div className="cv-page__languages">
            {languages.map((language) => (
              <div className="cv-page__language" key={language.name}>
                <div className="cv-page__language__header">
                  <span>{language.name}</span>
                  <span className="cv-page__language__level-label">{language.level}</span>
                </div>
                <div className="cv-page__language__bar">
                  <div
                    className="cv-page__language__bar__fill"
                    style={{ width: `${language.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="cv-page__cta">
          <h2 className="cv-page__cta__title">Hai qualcosa in mente?</h2>
          <p className="cv-page__cta__text">
            Sono sempre felice di parlare di nuove idee, progetti, collaborazioni o semplicemente fare due chiacchiere. Scrivimi, ti risponderò appena possibile!
          </p>

          <div className="cv-page__cta__actions">
            <a
              href="mailto:hello@marcocianetti.com"
              className="button cv-page__cta__button cv-page__cta__button--primary"
            >
              <FontAwesomeIcon icon={['fas', 'envelope']} />
              Scrivimi una email
            </a>
            <a
              href="https://linkedin.com/in/marcocianetti"
              target="_blank"
              rel="noopener noreferrer"
              className="button cv-page__cta__button cv-page__cta__button--secondary"
            >
              <FontAwesomeIcon icon={['fab', 'linkedin']} />
              Contattami su LinkedIn
            </a>
          </div>
        </section>
      </div>
    </Master>
  );
}
