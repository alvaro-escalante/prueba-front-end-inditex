// Punto de entrada de la aplicación
import App from '@src/presentation/App';
import React from 'react';
import { createRoot } from 'react-dom/client';
// Reset global
import './index.css';
const container = document.getElementById('root') as HTMLElement;

if (!container) {
  throw new Error('Container root no encontrado');
}
createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
