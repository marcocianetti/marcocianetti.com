import React from 'react';
import SuperMarioRunning from '../../images/super-mario/super-mario--running.gif';

type Props = {
  text?: string;
  className?: string;
};

export default function LoadingView(props: Props) {

  const [text, setText] = React.useState(props.text || 'Caricamento in corso');

  const updateText = () => {
    setText(t => t.includes('...') ? t.replace('...', '') : t + '.');
  };

  React.useEffect(() => {
    const timer = setInterval(updateText, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={props.className ? `loading-view ${props.className}` : `loading-view`}>
      <img src={SuperMarioRunning} className="loading-view__image" />
      <p className="loading-view__text">
        {text}
      </p>
    </div>
  );
}
