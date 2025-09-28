import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ItineraryProvider } from './context/ItineraryContext.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ItineraryProvider>
        <App />
      </ItineraryProvider>
    </ThemeProvider>
  </StrictMode>
);
