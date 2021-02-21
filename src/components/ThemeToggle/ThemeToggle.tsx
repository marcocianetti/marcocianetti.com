import * as React from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import Theme from '../../models/Theme';

type Props = {
  className?: string;
};

const ThemeToggle = ({ className }: Props) => {

  const { theme, setTheme } = React.useContext(ThemeContext);

  let cN = 'theme-toggle';
  if (!theme) {
    cN += ' theme-toggle--empty';
  }
  if (className) {
    cN += ` ${className}`;
  }

  if (!theme) {
    return (
      <label className={cN} />
    );
  }

  const handleOnClick = () => {
    if (theme === Theme.Dark) {
      setTheme(Theme.Light);
    } else {
      setTheme(Theme.Dark);
    }
  };

  return (
    <label onClick={handleOnClick} className={cN}>
      {theme === Theme.Dark ? '🌙' : '☀️'}
    </label>
  );
};

export default ThemeToggle;
