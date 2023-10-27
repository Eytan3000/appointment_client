import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { theme } from './theme/theme';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { IconContext } from "react-icons";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
      <IconContext.Provider value={{ color: "blue", className: "global-class-name" }}>
        <App />

        </IconContext.Provider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
