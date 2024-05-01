import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
// import { theme } from './theme/theme';
import { BrowserRouter } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <IconContext.Provider
        value={{ color: 'blue', className: 'global-class-name' }}>
        <QueryClientProvider client={queryClient}>
          <App />
          {/* <ReactQueryDevtools /> */}
        </QueryClientProvider>
      </IconContext.Provider>
    </BrowserRouter>
  </React.StrictMode>
);
