import { Route, Routes } from 'react-router-dom'
import { CustomCursor } from './components/CustomCursor'
import { Nav } from './components/Nav'
import { ScrollProgress } from './components/ScrollProgress'
import CaseAeronis from './pages/CaseAeronis'
import CaseOSA from './pages/CaseOSA'
import CaseRoomCost from './pages/CaseRoomCost'
import CaseVD from './pages/CaseVD'
import { HomePage } from './pages/Home'

export default function App() {
  return (
    <div className="page-skin relative z-[1]">
      <ScrollProgress />
      <CustomCursor />
      <Nav />
      {/* OSA hero activation — below header (z-100); must not cover global nav */}
      <div id="osa-activation-mount" className="osa-activation-mount" aria-hidden />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/case/vd" element={<CaseVD />} />
          <Route path="/case/roomcost" element={<CaseRoomCost />} />
          <Route path="/case/aeronis" element={<CaseAeronis />} />
          <Route path="/case/osa" element={<CaseOSA />} />
        </Routes>
      </main>
      <footer className="relative z-[1] border-t border-white/[0.06] px-6 py-10 text-center text-xs text-fog md:px-12">
        <p>AI Product Systems · Interaction Architecture · Workflow Design</p>
      </footer>
    </div>
  )
}
