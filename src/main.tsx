import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import './styles/case-system.css'
import './styles/aeronis-case.css'
import './styles/urbix-case.css'
import './styles/vd-case.css'
import './styles/roomcost-case.css'
import './styles/osa-card.css'
import './styles/osa-case.css'
import './styles/osa-case-narrative.css'
import './styles/osa-case-ops.css'
import './styles/osa-hero-activation.css'
import App from './App.tsx'
import { ScrollToTop } from './components/ScrollToTop'

document.documentElement.style.setProperty(
  '--steel-texture',
  `url("${import.meta.env.BASE_URL}STEEL_texture.jpg")`,
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <ScrollToTop />
      <App />
    </HashRouter>
  </StrictMode>,
)
