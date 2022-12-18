import React from 'react';
import { ThemeProvider } from 'context/ThemeContext';

type Props = {
  children?: React.ReactNode;
};

function App({ children }: Props) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}

export default App;