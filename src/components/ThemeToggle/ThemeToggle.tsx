import * as React from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import Theme from '../../models/Theme';

type Props = {
  className?: string;
};

const ThemeToggle = ({ className }: Props) => {

  const { theme, setTheme } = React.useContext(ThemeContext);

  const handleOnClick = () => {
    if (theme === Theme.Dark) {
      setTheme(Theme.Light);
    } else {
      setTheme(Theme.Dark);
    }
  };

  let cN = 'theme-toggle';
  if (className) {
    cN += ` ${className}`;
  }

  return (
    <label onClick={handleOnClick} className={cN}>
      {theme === Theme.Dark ? '🌙' : '☀️'}
    </label>
  );
};

export default ThemeToggle;
