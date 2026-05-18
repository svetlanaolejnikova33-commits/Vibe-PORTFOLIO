import { motion } from 'framer-motion'
export function About() {
  return (
    <section id="about" className="relative px-6 py-24 md:px-12 md:py-28 lg:px-16 lg:py-32">
      <motion.div
        className="relative z-[1] mx-auto max-w-3xl"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-8%' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-[0.625rem] font-medium uppercase tracking-[0.32em] text-metal-mid">Position</p>
        <h2 className="ui-section-title mt-4">
          <span className="ui-head-bright">AI-native product</span>{' '}
          <span className="ui-head-soft">systems architect</span>
        </h2>

        <div className="about-body-prose mt-10 max-w-xl md:mt-12">
          <p className="about-body-prose__stanza">
            I design <span className="about-body-prose__accent">interaction architecture</span>—how people
            perceive, decide, and move through intelligent products.
          </p>
          <p className="about-body-prose__stanza">
            My practice spans <span className="about-body-prose__accent">product vision</span>,{' '}
            <span className="about-body-prose__accent">AI workflow logic</span>, and interface behavior:
            systems that feel refined and operate with strategic clarity.
          </p>
          <p className="about-body-prose__stanza">
            Not execution for hire—architecture for products that need to think with their users.
          </p>
        </div>

        </motion.div>
    </section>
  )
}
