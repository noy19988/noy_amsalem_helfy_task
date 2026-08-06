import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/index.css";

import App from './main-app-layout/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
