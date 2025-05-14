
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import App from './App.tsx';
import './index.css';

// Setup theme detection
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
const storedTheme = localStorage.getItem('theme');
const initialTheme = storedTheme || (prefersDarkMode ? 'dark' : 'light');

// Apply theme immediately to prevent flash
if (initialTheme === 'dark') {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
    <Toaster 
      position="top-right" 
      closeButton 
      richColors 
    />
  </BrowserRouter>
);
