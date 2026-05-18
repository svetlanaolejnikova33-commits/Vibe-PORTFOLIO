import { motion } from 'framer-motion'
import { SteelReflex } from '../components/SteelReflex'

const EASE = [0.22, 1, 0.36, 1] as const

const essays = [
  {
    title: 'Why most AI products feel forgettable',
    body: 'They optimize demos, not decisions. Memory lives in workflow compression—not novelty.',
  },
  {
    title: 'Interfaces are behavioral systems',
    body: 'Every screen is a sequence of commitments. I design states, not screens.',
  },
  {
    title: 'AI should reduce cognitive load',
    body: 'Intelligence belongs where uncertainty is highest—invisible until the moment of choice.',
  },
  {
    title: 'Good products compress uncertainty',
    body: 'The best systems turn ambiguity into one clear next step without flattening nuance.',
  },
  {
    title: 'Workflow is the product',
    body: 'Features are outputs. The real artifact is how attention, data, and intent move through time.',
  },
  {
    title: 'Emotion and logic are not opposites',
    body: 'Perception is data. A calm interface can be the most rigorous decision architecture.',
  },
  {
    title: 'Most tools fail at perception design',
    body: 'They explain what they do—not what they make the user feel capable of becoming.',
  },
  {
    title: 'The future of interfaces is anticipatory',
    body: 'Not reactive chat. Systems that model intent before the user finishes forming it.',
  },
]

export function Thinking() {
  return (
    <section id="thinking" className="relative overflow-hidden px-6 py-28 md:px-12 md:py-36 lg:px-16">
      <SteelReflex variant="projectsAmbient" />
      <motion.div
        className="relative z-[1] mx-auto max-w-4xl"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-8%' }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <p className="text-[0.625rem] font-medium uppercase tracking-[0.32em] text-metal-mid">Thinking</p>
        <h2 className="ui-section-title mt-4 max-w-2xl">
          <span className="ui-head-bright">Strategic notes</span>{' '}
          <span className="ui-head-soft">on product &amp; AI systems</span>
        </h2>
        <p className="mt-6 max-w-xl text-base font-normal leading-[1.72] text-fog md:text-lg">
          Short observations on how intelligent products should behave—not marketing essays.
        </p>
      </motion.div>

      <div className="relative z-[1] mx-auto mt-16 max-w-4xl md:mt-20">
        {essays.map((essay, i) => (
          <motion.article
            key={essay.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-6%' }}
            transition={{ duration: 0.75, ease: EASE, delay: i * 0.04 }}
            className="thinking-essay group border-t border-white/[0.08] py-9 first:border-t-0 first:pt-0 md:py-11"
          >
            <div className="grid gap-4 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-12 md:gap-y-0">
              <h3 className="font-display text-lg font-semibold leading-[1.35] tracking-[-0.02em] text-mist md:text-xl">
                {essay.title}
              </h3>
              <p className="text-[0.9375rem] font-normal leading-[1.72] text-fog/88 md:text-base md:leading-[1.75]">
                {essay.body}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
