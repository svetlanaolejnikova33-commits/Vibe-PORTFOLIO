import { CustomCursor } from './components/CustomCursor'
import { Nav } from './components/Nav'
import { ScrollProgress } from './components/ScrollProgress'
import { About } from './sections/About'
import { Approach } from './sections/Approach'
import { Contacts } from './sections/Contacts'
import { ForWho } from './sections/ForWho'
import { Hero } from './sections/Hero'
import { HeroFlowMarquee } from './sections/HeroFlowMarquee'
import { Manifest } from './sections/Manifest'
import { Projects } from './sections/Projects'
import { Services } from './sections/Services'
import { Stack } from './sections/Stack'
import { Testimonials } from './sections/Testimonials'
import { WhyMe } from './sections/WhyMe'

export default function App() {
  return (
    <div className="page-skin relative z-[1]">
      <ScrollProgress />
      <CustomCursor />
      <Nav />
      <main>
        <Hero />
        <HeroFlowMarquee />
        <About />
        <Services />
        <Approach />
        <Projects />
        <WhyMe />
        <Stack />
        <ForWho />
        <Manifest />
        <Testimonials />
        <Contacts />
      </main>
      <footer className="relative z-[1] border-t border-white/[0.06] px-6 py-10 text-center text-xs text-fog md:px-12">
        <p>Vibe Coder · Web &amp; AI Experiences</p>
      </footer>
    </div>
  )
}
