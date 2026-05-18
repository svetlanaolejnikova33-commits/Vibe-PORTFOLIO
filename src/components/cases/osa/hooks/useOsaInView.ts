import { useEffect, useRef, useState } from 'react'

export function useOsaInView(threshold = 0.32) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const [played, setPlayed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  const active = inView && !played

  const markPlayed = () => setPlayed(true)

  return { ref, inView, active, played, markPlayed }
}
