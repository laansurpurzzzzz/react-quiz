import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './app.tsx';

import '../public/css/index.css';

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
