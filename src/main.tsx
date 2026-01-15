import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { LanguageProvider } from './contexts/LanguageContext'
import { CookieProvider } from './contexts/CookieContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CookieProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </CookieProvider>
    </BrowserRouter>
  </StrictMode>,
)
