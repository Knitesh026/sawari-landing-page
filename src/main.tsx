
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { TranslationProvider } from '@/i18n/TranslationProvider';
import { Toaster } from "./components/ui/toaster";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TranslationProvider>
        <App />
        <Toaster />
      </TranslationProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
