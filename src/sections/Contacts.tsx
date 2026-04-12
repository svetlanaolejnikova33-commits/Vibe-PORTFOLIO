import { motion } from 'framer-motion'

export function Contacts() {
  return (
    <section id="contacts" className="relative px-6 py-28 md:px-12 lg:px-16">
      <div className="mx-auto max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="ui-section-title"
        >
          <span className="ui-head-bright">Контакт</span>
          <span className="ui-head-soft">ы</span>
        </motion.h2>

        <div className="mt-12 flex flex-col gap-10 md:gap-12">
          <motion.a
            href="https://t.me/Svetlana_Oleynikova"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="link-undertext block w-full border-b border-white/[0.08] pb-10 transition-colors duration-500 hover:text-accent-hover"
          >
            <span className="mb-3 block text-sm uppercase tracking-[0.2em] text-metal-mid">Telegram</span>
            <span className="block break-all font-sans text-xl leading-snug text-mist md:text-2xl">
              @Svetlana_Oleynikova
            </span>
          </motion.a>

          <motion.a
            href="mailto:svetart74@mail.ru"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="link-undertext block w-full transition-colors duration-500 hover:text-accent-hover"
          >
            <span className="mb-3 block text-sm uppercase tracking-[0.2em] text-metal-mid">Email</span>
            <span className="block break-all font-sans text-xl leading-snug text-mist md:text-2xl">
              Svetart74@mail.ru
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  )
}
