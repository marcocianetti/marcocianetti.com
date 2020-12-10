import * as React from 'react';

const ThemeScriptTag = () => {
  let codeToRunOnClient = `
    (function() {
      const LOCAL_STORAGE_THEME_KEY = 'mc-theme';
      
      const Colors = {
        light: {
          backgroundColor: '#fff',
          lightBackgroundColor: '#fafbfc',
          textColor: '#1e1e1e',
          lightTextColor: 'rgba(0, 0, 0, 0.6)',
          headingTextColor: '#111',
          primaryColor: '#1b62ff',
          navbarBackgroundColor: '#fff',
          footerBackgroundColor: '#fafbfc',
        },
        dark: {
          backgroundColor: '#1f2022',
          lightBackgroundColor: '#1a1a1a',
          textColor: '#eee',
          lightTextColor: '#868e96',
          headingTextColor: '#fff',
          primaryColor: '#1b62ff',
          navbarBackgroundColor: '#18191a',
          footerBackgroundColor: '#18191a',
        },
      };
    
      function getTheme() {
        const persistedColorPreference = window.localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
        const hasPersistedPreference = typeof persistedColorPreference === 'string';
    
        // If the user has explicitly chosen light or dark,
        // let's use it. Otherwise, this value will be null.
        if (hasPersistedPreference) {
          return persistedColorPreference;
        }
    
        // If they haven't been explicit, let's check the media query
        const mql = window.matchMedia('(prefers-color-scheme: dark)');
        const hasMediaQueryPreference = typeof mql.matches === 'boolean';
        if (hasMediaQueryPreference) {
          return mql.matches ? 'dark' : 'light';
        }
    
        // If they are using a browser/OS that doesn't support
        // color themes, let's default to 'light'.
        return 'light';
      }
      
      const t = getTheme();
      const theme = Colors[t];
      const root = document.documentElement;
    
      Object.keys(theme).forEach((k, v) => {
        const key = k.split(/(?=[A-Z])/).map(s => s.toLowerCase()).join('-');
        root.style.setProperty(\`--\$\{key\}\`, theme[k]);
      });
    
      root.style.setProperty('--initial-theme', t);
    })()
  `;

  return <script dangerouslySetInnerHTML={{ __html: codeToRunOnClient }} />;
};

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents(<ThemeScriptTag />);
};
