import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "./providers/ThemeProvider.tsx";
import { Toaster } from "@/components/ui/sonner"


createRoot(document.getElementById('root')!).render(
  <ThemeProvider>

    <BrowserRouter>
      <App />
      <Toaster position='top-right'/>
    </BrowserRouter>
  </ThemeProvider>

);
