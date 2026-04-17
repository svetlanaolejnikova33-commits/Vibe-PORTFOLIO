import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
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
