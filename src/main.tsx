import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { startDataSync } from './lib/firebase/sync'
import { initAnalytics } from './lib/firebase/analytics'

// Firestore live data (public content for everyone, admin data after sign-in) + GA4.
startDataSync()
void initAnalytics()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
