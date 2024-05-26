import App from '@src/presentation/App';
import React from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
const container = document.getElementById('root') as HTMLElement;

if (!container) {
  throw new Error('Container not found');
}
createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
