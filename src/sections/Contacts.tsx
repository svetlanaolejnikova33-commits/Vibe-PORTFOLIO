import { motion } from 'framer-motion'

const channels = [
  {
    label: 'Telegram',
    href: 'https://t.me/Svetlana_Oleynikova',
    display: '@Svetlana_Oleynikova',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/svetlana-oleynikova',
    display: 'LinkedIn profile',
  },
  {
    label: 'Email',
    href: 'mailto:savannalip@mail.ru',
    display: 'savannalip@mail.ru',
  },
] as const

export function Contacts() {
  return (
    <section id="contacts" className="relative px-6 py-28 md:px-12 lg:px-16">
      <motion.div
        className="mx-auto max-w-2xl"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-[0.625rem] font-medium uppercase tracking-[0.32em] text-metal-mid">Connect</p>
        <h2 className="ui-section-title mt-4">
          <span className="ui-head-bright">Selective</span>{' '}
          <span className="ui-head-soft">collaboration</span>
        </h2>
        <p className="mt-5 max-w-md text-base font-normal leading-[1.7] text-fog">
          Product architecture, AI workflow design, and interface strategy—for teams building what comes next.
        </p>

        <div className="mt-14 flex flex-col gap-0">
          {channels.map((ch, i) => (
            <motion.a
              key={ch.label}
              href={ch.href}
              target={ch.label === 'Email' ? undefined : '_blank'}
              rel={ch.label === 'Email' ? undefined : 'noopener noreferrer'}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.6 }}
              className="ix-contact-row link-undertext group block border-t border-white/[0.08] py-8 text-mist/90 first:border-t-0 first:pt-0 hover:text-mist/95"
            >
              <span className="mb-2 block text-[0.625rem] font-medium uppercase tracking-[0.24em] text-metal-mid transition-colors group-hover:text-accent/70">
                {ch.label}
              </span>
              <span className="block font-sans text-lg font-normal text-mist/92 md:text-xl">{ch.display}</span>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
