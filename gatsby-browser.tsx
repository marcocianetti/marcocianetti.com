import React from 'react';
import App from './src/components/App';

import 'prismjs/themes/prism-tomorrow.min.css';

export const wrapRootElement = ({ element }) => {
  return <App>{element}</App>;
};