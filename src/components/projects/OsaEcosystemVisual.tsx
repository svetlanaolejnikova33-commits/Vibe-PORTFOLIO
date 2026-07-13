import { motion, useReducedMotion } from 'framer-motion'

const STACK_LAYERS = [
  'AI Layer',
  'Registry Architecture',
  'Source Graph',
  'BIM Handoff Model',
  'Budget Logic',
  'Specification Output',
] as const

export function OsaEcosystemVisual({ noHeavy }: { noHeavy: boolean }) {
  const reduceMotion = useReducedMotion()
  const still = !!(noHeavy || reduceMotion)

  return (
    <div className="osa-card__visual" aria-hidden>
      <div className="osa-visual__graph">
        <svg viewBox="0 0 400 320" fill="none" preserveAspectRatio="xMidYMid slice">
          <line className="osa-graph-line osa-graph-line--flow" x1="48" y1="160" x2="200" y2="80" />
          <line className="osa-graph-line" x1="200" y1="80" x2="340" y2="140" />
          <line className="osa-graph-line osa-graph-line--flow" x1="200" y1="80" x2="180" y2="220" />
          <line className="osa-graph-line" x1="180" y1="220" x2="320" y2="260" />
          <line className="osa-graph-line" x1="48" y1="160" x2="120" y2="260" />
          <circle className="osa-graph-node osa-graph-node--pulse" cx="48" cy="160" r="5" />
          <circle className="osa-graph-node" cx="200" cy="80" r="6" />
          <circle className="osa-graph-node osa-graph-node--pulse" cx="340" cy="140" r="5" />
          <circle className="osa-graph-node" cx="180" cy="220" r="5" />
          <circle className="osa-graph-node" cx="320" cy="260" r="4" />
          <circle className="osa-graph-node" cx="120" cy="260" r="4" />
          <rect
            x="60"
            y="40"
            width="280"
            height="200"
            stroke="rgba(126,200,232,0.06)"
            strokeWidth="0.75"
            fill="none"
            strokeDasharray="6 8"
          />
        </svg>
      </div>

      <div className="osa-fragments">
        <motion.div
          className="osa-fragment osa-fragment--registry"
          initial={still ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={still ? undefined : { y: 0 }}
        >
          <p className="osa-fragment__cap">Registry</p>
          <div className="osa-fragment__body">
            {[1, 2, 3].map((n) => (
              <div className="osa-registry-row" key={n}>
                <span />
                <span />
                <span />
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="osa-fragment osa-fragment--bim"
          initial={still ? false : { opacity: 0, x: -6 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.18 }}
        >
          <p className="osa-fragment__cap">BIM</p>
          <div className="osa-fragment__body">
            <div className="osa-bim-plan" />
          </div>
        </motion.div>

        <motion.div
          className="osa-fragment osa-fragment--ai"
          initial={still ? false : { opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.26 }}
        >
          <p className="osa-fragment__cap">AI Interior</p>
          <div className="osa-fragment__body">
            <div className="osa-ai-block" />
          </div>
        </motion.div>

        <motion.div
          className="osa-fragment osa-fragment--spec"
          initial={still ? false : { opacity: 0, x: 6 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.14 }}
        >
          <p className="osa-fragment__cap">Specification</p>
          <div className="osa-fragment__body osa-spec-lines">
            <span />
            <span />
            <span />
          </div>
        </motion.div>

        <motion.div
          className="osa-fragment osa-fragment--supplier"
          initial={still ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.22 }}
        >
          <p className="osa-fragment__cap">Suppliers</p>
          <div className="osa-fragment__body osa-supplier-nodes">
            <i />
            <i />
            <i />
            <i />
          </div>
        </motion.div>
      </div>

      <div className="osa-visual__stack">
        {STACK_LAYERS.map((label, i) => (
          <div key={label}>
            {i > 0 ? <div className="osa-stack__connector" /> : null}
            <motion.div
              className={[
                'osa-stack__item',
                i === 0 || i === STACK_LAYERS.length - 1 ? 'osa-stack__item--active' : '',
              ].join(' ')}
              initial={still ? false : { opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.08 + i * 0.05 }}
            >
              <span className="osa-stack__node" />
              {label}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  )
}
