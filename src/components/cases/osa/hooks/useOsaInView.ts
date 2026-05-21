import { useCallback, useEffect, useRef, useState } from 'react'

export function useOsaInView(threshold = 0.32) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const [played, setPlayed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView((prev) => (prev ? prev : true))
        } else {
          setInView((prev) => (prev ? false : prev))
          setPlayed((prev) => (prev ? false : prev))
        }
      },
      { threshold, rootMargin: '0px 0px -10% 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  const markPlayed = useCallback(() => {
    setPlayed((prev) => (prev ? prev : true))
  }, [])

  return { ref, inView, played, markPlayed }
}
