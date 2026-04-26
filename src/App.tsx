import { Route, Routes } from 'react-router-dom'
import { CustomCursor } from './components/CustomCursor'
import { Nav } from './components/Nav'
import { ScrollProgress } from './components/ScrollProgress'
import CaseAeronis from './pages/CaseAeronis'
import CaseVD from './pages/CaseVD'
import { HomePage } from './pages/Home'

export default function App() {
  return (
    <div className="page-skin relative z-[1]">
      <ScrollProgress />
      <CustomCursor />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/case/vd" element={<CaseVD />} />
          <Route path="/case/aeronis" element={<CaseAeronis />} />
        </Routes>
      </main>
      <footer className="relative z-[1] border-t border-white/[0.06] px-6 py-10 text-center text-xs text-fog md:px-12">
        <p>Vibe Coder · Web &amp; AI Experiences</p>
      </footer>
    </div>
  )
}
