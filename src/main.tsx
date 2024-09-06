import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.scss'
import { useEffect } from 'react'
import KTComponent from './metronic/core/index.ts'
import KTLayout from './metronic/app/layouts/demo1.js'
import { BrowserRouter, useLocation } from 'react-router-dom'
import './providers/language/i18n.ts'
import StoreProviders from './providers/StoreProvider/StoreProviders.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

const googleId = import.meta.env.VITE_GOOGLE_CLIEND_ID

const Main = () => {
  const location = useLocation()
  useEffect(() => {
    KTComponent.init()
    KTLayout.init()
  }, [location])

  return <App />
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProviders>
      <BrowserRouter>
        <GoogleOAuthProvider clientId={googleId}>
          <Main />
        </GoogleOAuthProvider>
      </BrowserRouter>
    </StoreProviders>
  </React.StrictMode>
)
