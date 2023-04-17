import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { App } from './App';
import { ChromeProvider } from './ChromeContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ChromeProvider>
      <App />
    </ChromeProvider>
  </React.StrictMode>
);
