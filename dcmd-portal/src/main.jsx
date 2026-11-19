import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import StaffTools from './components/staff/StaffTools.jsx'

const isStaffToolsPage = /^\/staff-tools\/?$/.test(window.location.pathname)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isStaffToolsPage ? <StaffTools /> : <App />}
  </StrictMode>,
)
