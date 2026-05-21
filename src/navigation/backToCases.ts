import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { releaseAppScrollLock } from './appScrollLock'

/** Home section id for the Product cases grid */
export const PROJECTS_SECTION_ID = 'projects'

export function scrollToHomeSection(
  sectionId: string,
  behavior: ScrollBehavior = 'smooth',
): boolean {
  const el = document.getElementById(sectionId)
  if (!el) return false
  el.scrollIntoView({ behavior, block: 'start' })
  return true
}

export function scheduleScrollToHomeSection(sectionId: string, maxAttempts = 30) {
  let attempts = 0

  const tick = () => {
    if (scrollToHomeSection(sectionId)) return
    if (++attempts < maxAttempts) window.setTimeout(tick, 50)
  }

  requestAnimationFrame(() => requestAnimationFrame(tick))
}

/** React Router navigation back to cases grid (no window.location / hash hacks). */
export function useBackToCases() {
  const navigate = useNavigate()

  return useCallback(() => {
    releaseAppScrollLock()
    navigate({ pathname: '/', search: `?section=${PROJECTS_SECTION_ID}` })
    scheduleScrollToHomeSection(PROJECTS_SECTION_ID)
  }, [navigate])
}
