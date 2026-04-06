import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

document.documentElement.style.setProperty(
  '--steel-texture',
  `url("${import.meta.env.BASE_URL}STEEL_texture.jpg")`,
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
