
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import App from './App.tsx';
import './index.css';

// Apply dark theme by default since we're going with a dark theme design
document.documentElement.classList.add('dark');
localStorage.setItem('theme', 'dark');

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
    <Toaster 
      position="top-right" 
      closeButton 
      richColors 
      theme="dark" 
    />
  </BrowserRouter>
);
