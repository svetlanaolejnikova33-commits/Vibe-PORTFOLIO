import { motion } from 'framer-motion'
import { usePreferLiteMotion } from '../hooks/usePreferLiteMotion'

const links = [
  ['Обо мне', '#about'],
  ['Проекты', '#projects'],
  ['Подход', '#approach'],
  ['Контакты', '#contacts'],
]

export function Nav() {
  const liteViewport = usePreferLiteMotion()

  return (
    <motion.header
      initial={
        liteViewport
          ? { opacity: 0, y: -8 }
          : { opacity: 0, y: -12 }
      }
      animate={
        liteViewport
          ? { opacity: 1, y: 0 }
          : { opacity: 1, y: 0 }
      }
      transition={{
        duration: liteViewport ? 0.45 : 0.85,
        ease: [0.22, 1, 0.36, 1] as const,
        delay: liteViewport ? 0.08 : 0.2,
      }}
      className="fixed left-0 right-0 top-0 z-[100] px-4 pt-4 md:px-8"
    >
      <nav
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 rounded-box border border-[rgba(105,68,50,0.32)] bg-[rgba(15,20,23,0.97)] px-5 py-3 shadow-depth-sm backdrop-blur-none md:flex-nowrap md:gap-4 md:px-8"
        style={{
          boxShadow: liteViewport
            ? '0 6px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)'
            : '0 12px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.07)',
        }}
      >
        <a
          href="#top"
          className="link-undertext link-undertext--brand order-1 ui-nav-mark bg-gradient-to-br from-[#c45826] via-[#9d4117] to-[#7a320f] bg-clip-text text-transparent transition-opacity duration-500 hover:opacity-90 md:order-none"
        >
          Vibe Coder
        </a>
        <ul className="order-3 flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-1 font-sans text-xs text-mist/88 sm:w-auto sm:justify-end sm:text-sm md:order-none md:w-auto md:justify-center">
          {links.map(([label, href]) => (
            <li key={href}>
              <a
                href={href}
                className="link-undertext link-undertext--surface transition-colors duration-500 hover:text-mist/95"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contacts"
          className="order-2 rounded-box border border-[rgba(157,65,23,0.32)] bg-white/[0.04] px-4 py-2 font-sans text-xs font-medium uppercase tracking-wider transition-[box-shadow,border-color,opacity] duration-500 hover:border-[rgba(157,65,23,0.55)] hover:opacity-95 hover:shadow-[0_0_24px_rgba(157,65,23,0.12)] md:order-none md:text-sm"
        >
          <span className="bg-gradient-to-br from-[#c45826] via-[#9d4117] to-[#7a320f] bg-clip-text text-transparent">
            Связаться
          </span>
        </a>
      </nav>
    </motion.header>
  )
}
