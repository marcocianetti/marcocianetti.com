import Project from '../../src/models/Project';

const projects: Project[] = [
    {
        icon: '🤖',
        name: 'marcocianetti.github.io',
        description: 'GitHub Pages in cui puoi trovare tutorial ed esempi dei miei progetti e articoli',
        url: 'https://marcocianetti.github.io/',
    },
    {
        icon: '📝',
        name: 'GitHub README',
        description: 'README personale su GitHub',
        url: 'https://github.com/marcocianetti/marcocianetti',
    },
    {
        icon: '🐦',
        name: 'Flappy Bird - NEAT',
        description: 'Implementazione dell\'algoritmo NEAT in JavaScript applicato al famoso gioco Flappy Bird',
        url: 'https://github.com/marcocianetti/neat-flappy-bird',
    },
    {
        icon: '🤓',
        name: 'marcocianetti.com',
        description: 'Il codice sorgente di questo sito, realizzato con GatsbyJS, ReactJS, Sass e GraphQL',
        url: 'https://github.com/marcocianetti/marcocianetti.com',
    },
];

export default projects;