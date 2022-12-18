import * as React from 'react';

import Theme from 'models/Theme';
import ThemeUtils from 'utils/ThemeUtils';

type Props = {
  children: React.ReactNode;
}

type ThemeContextProps = {
  theme?: Theme;
  setTheme(t: Theme): void;
}

export const ThemeContext = React.createContext<ThemeContextProps>({
  theme: undefined,
  setTheme: (t: Theme) => {},
});

export const ThemeProvider = ({ children }: Props) => {

  const [theme, setLocalTheme] = React.useState<Theme | undefined>(ThemeUtils.getTheme());

  React.useEffect(() => {
    const root = window.document.documentElement;
    const initialTheme = root.style.getPropertyValue('--initial-theme');

    setLocalTheme(initialTheme as Theme);
  }, []);

  const setTheme = (t: Theme) => {
    setLocalTheme(t);

    // Persist it on update
    ThemeUtils.setTheme(t);
  };

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      {children}
    </ThemeContext.Provider>
  );

};
