import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Scroll to top only when the route pathname changes (e.g. /case/osa → /).
 * Must NOT run when ?section= is cleared after Home deep-link scroll —
 * that was forcing the page back to the hero.
 */
export function ScrollToTop() {
  const { pathname, search } = useLocation()
  const prevPathname = useRef(pathname)

  useEffect(() => {
    const pathChanged = prevPathname.current !== pathname
    prevPathname.current = pathname

    if (!pathChanged) return

    if (pathname === '/' && new URLSearchParams(search).get('section')) {
      return
    }

    window.scrollTo(0, 0)
  }, [pathname, search])

  return null
}
