import { VdPhoto } from '../components/vd/VdPhoto'
import { MetalButton } from '../components/MetalButton'
import { homeSectionTo } from '../routes'

const base = `${import.meta.env.BASE_URL}cases/vd`

export default function CaseVD() {
  return (
    <article className="case-page case-page--vd">
      <section className="case-section vd-hero !mt-0">
        <div className="mb-10 flex flex-wrap items-center gap-4">
          <MetalButton to={homeSectionTo('projects')}>Back to cases</MetalButton>
        </div>

        <div className="vd-hero__grid">
          <div className="vd-hero__statement">
            <p className="vd-hero__kicker">CASE · Custom furniture</p>
            <h1 className="case-title">
              Furniture built with
              <br />
              <span className="vd-hero__accent">architectural precision</span>
            </h1>
            <p className="case-lead">
              A private manufacturer repositioned from local workshop signal to premium fabrication
              studio — through material presence, not digital spectacle.
            </p>
            <p className="case-sublead">
              <span className="font-medium" style={{ color: 'rgba(228, 218, 202, 0.88)' }}>
                Not a tech product.
              </span>
              <br />
              Objects with weight, warmth, and permanence.
            </p>
          </div>

          <div className="vd-hero__visual">
            <VdPhoto
              src={`${base}/vd-hero.jpg`}
              alt="Premium custom interior — material and light"
              caption="Workshop atmosphere"
              insight="Warm light · Tactile finish"
              variant="hero"
              className="!mt-0"
            />
          </div>
        </div>
      </section>

      <section className="case-section">
        <div className="case-label">01</div>
        <h2 className="case-section-title">Context</h2>

        <div className="vd-context-rule max-w-3xl">
          <p className="mb-8 text-sm leading-[1.7] text-[color:var(--vd-muted)]">
            The starting point was strong craft with weak market reading — production existed, premium
            perception did not.
          </p>
          <div className="space-y-8">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[color:var(--vd-dim)]">
                Positioning gap
              </p>
              <p className="text-[clamp(1.125rem,1.1vw+0.85rem,1.375rem)] leading-[1.55] text-[color:var(--vd-text)]">
                No premium presentation. The offer read as small local production, not a trusted
                fabrication partner.
              </p>
            </div>
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[color:var(--vd-dim)]">
                Trust architecture
              </p>
              <p className="text-[clamp(1.125rem,1.1vw+0.85rem,1.375rem)] leading-[1.55] text-[color:var(--vd-text)]">
                No coherent system for how quality, process, and outcome were shown to high-value clients.
              </p>
            </div>
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[color:var(--vd-dim)]">Reality</p>
              <p className="text-[clamp(1.125rem,1.1vw+0.85rem,1.375rem)] leading-[1.55] text-[color:var(--vd-text)]">
                Ten years of precision manufacturing — under-signaled to the segment that would pay for
                it.
              </p>
            </div>
          </div>
        </div>

        <p className="vd-problem-accent">
          Craft was never the problem. <strong>Perception was.</strong>
        </p>

        <VdPhoto
          src={`${base}/vd-production.jpg`}
          alt="Fabrication environment — material and process"
          caption="Production"
          insight="Precision · Physical scale"
        />
      </section>

      <section className="case-section">
        <div className="case-label">02</div>
        <h2 className="case-section-title">Strategic transformation</h2>

        <p className="max-w-3xl text-lg leading-[1.65] text-[color:var(--vd-muted)]">
          Reposition the workshop as a premium atelier: identity, presence, and communication aligned
          with the weight of the objects produced.
        </p>

        <div className="vd-shift max-w-3xl">
          <p className="vd-shift__from">from “local furniture maker”</p>
          <p className="vd-shift__arrow">↓</p>
          <p className="vd-shift__to">to “architectural custom interiors with permanence”</p>
        </div>

        <div className="vd-pillars">
          {[
            { label: 'Repositioning', text: 'Premium fabrication studio, not catalog carpentry.' },
            { label: 'Visual identity', text: 'Warm restraint, material honesty, masculine confidence.' },
            { label: 'Trust rebuilding', text: 'Process, scale, and outcome shown with editorial calm.' },
            { label: 'Perception', text: 'Market reads level before reading price.' },
            { label: 'Digital presence', text: 'Landing as atmosphere — not a service dashboard.' },
            { label: 'Communication', text: 'Quiet authority instead of promotional noise.' },
          ].map((item) => (
            <div key={item.label} className="vd-pillar">
              <p className="vd-pillar__label">{item.label}</p>
              <p className="vd-pillar__text">{item.text}</p>
            </div>
          ))}
        </div>

        <VdPhoto
          src={`${base}/vd-advantages.jpg`}
          alt="Brand communication — value and craft"
          caption="Strategic layer"
          insight="Clarity · Premium tone"
        />
      </section>

      <section className="case-section">
        <div className="case-label">03</div>
        <h2 className="case-section-title">Design system</h2>

        <p className="max-w-3xl text-lg leading-[1.65] text-[color:var(--vd-muted)]">
          Brand components — typography, material palette, hierarchy — presented as editorial objects,
          not interface diagrams.
        </p>

        <div className="vd-brand-grid">
          <div className="vd-brand-plate">
            <p className="vd-brand-plate__title">Typography</p>
            <p className="vd-brand-plate__body">
              Display weight for conviction. Body rhythm for calm reading. Generous measure — workshop
              pace, not startup density.
            </p>
          </div>
          <div className="vd-brand-plate">
            <p className="vd-brand-plate__title">Materials</p>
            <p className="vd-brand-plate__body">
              Wood grain, brushed metal, warm neutrals. Surfaces that feel built — photographed, not
              rendered.
            </p>
            <div className="vd-swatches" aria-hidden>
              <span className="vd-swatch vd-swatch--wood" />
              <span className="vd-swatch vd-swatch--bronze" />
              <span className="vd-swatch vd-swatch--graphite" />
              <span className="vd-swatch vd-swatch--warm" />
            </div>
          </div>
          <div className="vd-brand-plate">
            <p className="vd-brand-plate__title">Hierarchy</p>
            <p className="vd-brand-plate__body">
              One primary message per view. Photography carries emotion; type carries structure.
            </p>
          </div>
          <div className="vd-brand-plate">
            <p className="vd-brand-plate__title">Emotional direction</p>
            <p className="vd-brand-plate__body">
              Quiet mastery. Confidence without luxury cliché. The feeling of entering a space that
              will last.
            </p>
          </div>
          <div className="vd-brand-plate vd-brand-plate--wide">
            <p className="vd-brand-plate__title">Experience logic</p>
            <p className="vd-brand-plate__body">
              One calm path from interest to inquiry — no dashboards, no urgency tricks. Photography
              and type carry trust; the interface stays out of the way.
            </p>
          </div>
        </div>
      </section>

      <section className="case-section">
        <div className="case-label">04</div>
        <h2 className="case-section-title">Experience</h2>

        <p className="max-w-3xl text-lg leading-[1.65] text-[color:var(--vd-muted)]">
          The ordering journey should feel calm, confident, and physically grounded — clarity without
          sales pressure.
        </p>

        <div className="vd-experience-grid">
          <VdPhoto
            src={`${base}/vd-portfolio-living.jpg`}
            alt="Living interior — integrated custom furniture"
            caption="Living"
            insight="Integration · Light"
            className="!mt-0"
          />
          <VdPhoto
            src={`${base}/vd-portfolio-kitchen.jpg`}
            alt="Kitchen interior — custom fabrication"
            caption="Kitchen"
            insight="Detail · Function"
            className="!mt-0"
          />
        </div>

        <VdPhoto
          src={`${base}/vd-designers.jpg`}
          alt="Designer partnership — professional workflow"
          caption="Professional channel"
          insight="Trust · Collaboration"
        />
      </section>

      <section className="case-section vd-outcome case-finale">
        <div className="case-label">05</div>
        <h2 className="case-section-title">Outcome</h2>

        <div className="max-w-3xl space-y-6 text-[clamp(1.25rem,1.2vw+0.9rem,1.5rem)] leading-[1.58] text-[color:var(--vd-muted)]">
          <p>
            Stronger market perception — from skilled workshop to{' '}
            <span className="font-medium text-[color:var(--vd-bronze)]">premium identity</span>.
          </p>
          <p>Professional trust rebuilt through presence, not promises.</p>
          <p>Elevated image aligned with the physical quality already in production.</p>
        </div>

        <p className="vd-result">The work started selling at the level it was built.</p>

        <p className="vd-finale">
          Not a louder website. A heavier brand — one the market could finally read.
        </p>

        <div className="mt-12 flex flex-wrap gap-4">
          <MetalButton to={homeSectionTo('projects')}>Back to cases</MetalButton>
          <MetalButton to={homeSectionTo('contacts')} variant="primary">
            Connect
          </MetalButton>
        </div>
      </section>
    </article>
  )
}
