// react
import React from 'react';
import ReactDOM from 'react-dom/client';
// additional functional
import { TaskBookProvider } from './shared/context';
// components
import App from './App';
// styles
import './index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <TaskBookProvider>
      <App />
    </TaskBookProvider>
  </React.StrictMode>
);
