// react
import React from 'react';
import ReactDOM from 'react-dom/client';
// additional functional
import { TaskBookProvider } from './shared/context';
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from 'notistack';
// components
import App from './App';
// styles
import './index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <TaskBookProvider>
        <SnackbarProvider maxSnack={3}>
          <App />
        </SnackbarProvider>
      </TaskBookProvider>
    </BrowserRouter>
  </React.StrictMode>
);
