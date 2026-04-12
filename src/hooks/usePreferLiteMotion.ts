import { useEffect, useState } from 'react'

/** Tailwind `lg` = 1024px — ниже планшет/мобильный режим с облегчённой графикой */
const LITE_MOTION_MQ = '(max-width: 1023px)'

export function usePreferLiteMotion(): boolean {
  const [lite, setLite] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(LITE_MOTION_MQ)
    const apply = () => setLite(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  return lite
}
