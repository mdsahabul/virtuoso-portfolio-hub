
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import App from './App.tsx';
import './index.css';

// Initialize theme from localStorage or system preference
const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const initialTheme = savedTheme || systemTheme;

document.documentElement.classList.add(initialTheme);

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
    <Toaster 
      position="top-right" 
      closeButton 
      richColors 
      theme={initialTheme}
    />
  </BrowserRouter>
);
