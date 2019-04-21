const config = {
  siteTitle: 'Marco Cianetti',
  siteTitleShort: 'Marco Cianetti',
  siteTitleAlt: 'Marco Cianetti',
  siteLogo: '/logos/logo-square-1024.jpg',
  siteUrl: 'https://marcocianetti.com',
  repo: 'https://github.com/marcocianetti/marcocianetti.com',
  pathPrefix: '/',
  dateFromFormat: 'YYYY-MM-DD',
  dateFormat: 'MMMM Do, YYYY',
  siteDescription:
    'Marco Cianetti è un web developer, specializzato in JavaScript.',
  siteRss: '/rss.xml',
  googleAnalyticsID: 'UA-138287810-1',
  googleTagManagerID: 'GTM-NZW3R4T',
  disqusShortname: 'marcocianetti',
  postDefaultCategoryID: 'Tech',
  userName: 'Marco',
  userEmail: 'cianetti.m@gmail.com',
  userTwitter: 'marcocianetti_',
  userLocation: 'Roma, IT',
  userAvatar: '/logos/avatar.png',
  userDescription:
    'Web developer, specializzato in JavaScript',
  menuLinks: [
    {
      name: 'Me',
      link: '/about/',
    },
    {
      name: 'Contatti',
      link: '/contacts/',
    },
  ],
  themeColor: '#3F80FF', // Used for setting manifest and progress theme colors.
  backgroundColor: '#ffffff',
};

// Make sure pathPrefix is empty if not needed
if (config.pathPrefix === '/') {
  config.pathPrefix = ''
} else {
  // Make sure pathPrefix only contains the first forward slash
  config.pathPrefix = `/${config.pathPrefix.replace(/^\/|\/$/g, '')}`
}

// Make sure siteUrl doesn't have an ending forward slash
if (config.siteUrl.substr(-1) === '/') config.siteUrl = config.siteUrl.slice(0, -1);

// Make sure siteRss has a starting forward slash
if (config.siteRss && config.siteRss[0] !== '/') config.siteRss = `/${config.siteRss}`;

module.exports = config;
