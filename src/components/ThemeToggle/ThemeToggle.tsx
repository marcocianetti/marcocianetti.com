import * as React from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import Theme from '../../models/Theme';

type Props = {
  className?: string;
};

const ThemeToggle = ({ className }: Props) => {
  
  const [isClient, setIsClient] = React.useState(false);
  const { theme, setTheme } = React.useContext(ThemeContext);

  let cN = 'theme-toggle';
  if (!isClient) {
    cN += ' theme-toggle--loading';
  }
  if (className) {
    cN += ` ${className}`;
  }

  const handleOnClick = () => {
    if (theme === Theme.Dark) {
      setTheme(Theme.Light);
    } else {
      setTheme(Theme.Dark);
    }
  };

  // Fix the SSR error
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <label className={cN} />
    );
  }

  return (
    <label onClick={handleOnClick} className={cN}>
      {theme === Theme.Dark ? '🌙' : '☀️'}
    </label>
  );
};

export default ThemeToggle;
