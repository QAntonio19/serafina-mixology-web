import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

/* The brand didone for display, the grotesque for everything functional.
   Both self-hosted variable, font-display: swap. */
import '@fontsource-variable/bodoni-moda/opsz.css';
import '@fontsource-variable/archivo/index.css';

import './index.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
