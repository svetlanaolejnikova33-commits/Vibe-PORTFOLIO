import { motion } from 'framer-motion'

const links = [
  ['Обо мне', '#about'],
  ['Проекты', '#projects'],
  ['Подход', '#approach'],
  ['Контакты', '#contacts'],
]

export function Nav() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] as const, delay: 0.2 }}
      className="fixed left-0 right-0 top-0 z-[100] px-4 pt-4 md:px-8"
    >
      <nav
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 rounded-box border border-white/[0.1] bg-glass-fill px-5 py-3 shadow-depth-sm backdrop-blur-xl md:flex-nowrap md:gap-4 md:px-8"
        style={{
          boxShadow:
            '0 12px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(201,204,209,0.1)',
        }}
      >
        <a
          href="#top"
          className="link-undertext order-1 ui-nav-mark text-mist transition-colors duration-500 hover:text-accent md:order-none"
        >
          Vibe Coder
        </a>
        <ul className="order-3 flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-1 font-sans text-xs text-fog sm:w-auto sm:justify-end sm:text-sm md:order-none md:w-auto md:justify-center">
          {links.map(([label, href]) => (
            <li key={href}>
              <a
                href={href}
                className="link-undertext transition-[color,text-shadow] duration-500 hover:text-mist hover:[text-shadow:0_0_24px_rgba(111,227,255,0.15)]"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contacts"
          className="order-2 rounded-box border border-white/[0.12] bg-white/[0.04] px-4 py-2 font-sans text-xs font-medium uppercase tracking-wider text-mist backdrop-blur-md transition-[box-shadow,border-color] duration-500 hover:border-accent/30 hover:shadow-accent-glow md:order-none md:text-sm"
        >
          Связаться
        </a>
      </nav>
    </motion.header>
  )
}
