import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { scheduleScrollToHomeSection } from '../navigation/backToCases'
import { About } from '../sections/About'
import { Approach } from '../sections/Approach'
import { Contacts } from '../sections/Contacts'
import { Hero } from '../sections/Hero'
import { HeroFlowMarquee } from '../sections/HeroFlowMarquee'
import { Projects } from '../sections/Projects'
import { Stack } from '../sections/Stack'
import { Thinking } from '../sections/Thinking'

export function HomePage() {
  const [searchParams] = useSearchParams()
  const section = searchParams.get('section')

  useEffect(() => {
    if (!section) return
    scheduleScrollToHomeSection(section)
  }, [section])

  return (
    <>
      <Hero />
      <HeroFlowMarquee />
      <About />
      <Projects />
      <Thinking />
      <Stack />
      <Approach />
      <Contacts />
    </>
  )
}
