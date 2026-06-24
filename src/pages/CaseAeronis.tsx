import { AeronisFrame } from '../components/aeronis/AeronisFrame'
import { AeronisHeroAtmosphere } from '../components/aeronis/AeronisHeroAtmosphere'
import { AeronisRouteIntelligence } from '../components/aeronis/AeronisRouteIntelligence'
import { aeronisAssets } from '../components/aeronis/aeronisAssets'
import {
  AeronisAiShaPanel,
  AeronisHeroPanel,
  AeronisOutcomePanel,
  AeronisSystemPanel,
} from '../components/aeronis/AeronisProductUI'
import { MetalButton } from '../components/MetalButton'
import { homeSectionTo } from '../routes'

function SotaScreenshot({
  alt,
  caption,
  insight,
  variant = 'wide',
}: {
  alt: string
  caption: string
  insight?: string
  variant?: 'hero' | 'wide' | 'focus' | 'cinematic'
}) {
  return (
    <AeronisFrame caption={caption} insight={insight} variant={variant}>
      <picture className="an-screenshot">
        <source media="(min-width: 768px)" srcSet={aeronisAssets.splashDesktop} />
        <img
          src={aeronisAssets.splashMobile}
          alt={alt}
          className="an-screenshot__img"
          loading="lazy"
          decoding="async"
        />
      </picture>
    </AeronisFrame>
  )
}

function CaseAeronis() {
  return (
    <article className="case-page case-page--aeronis">
      <section className="case-section !mt-0">
        <div className="mb-10 flex flex-wrap items-center gap-4">
          <MetalButton to={homeSectionTo('projects')}>Back to cases</MetalButton>
        </div>

        <div className="case-label">CASE</div>

        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-start lg:gap-14">
          <div>
            <p className="an-brand-kicker">SOTA Companion</p>
            <h1 className="case-title">
              An AI travel companion that turns uncertainty into trajectory.
            </h1>

            <p className="case-lead">
              A calm intelligence layer that helps people plan, decide, and travel with{' '}
              <span className="text-[#ff7a4d]">less stress</span>.
            </p>

            <p className="case-sublead">
              <span className="font-semibold text-white">Not another booking platform.</span>
              <br />
              A companion that helps people move through travel decisions with clarity.
            </p>

            <div className="an-flow">
              <p className="an-flow__step">
                <span>01</span> Intent
              </p>
              <p className="an-flow__step">
                <span>02</span> Guide
              </p>
              <p className="an-flow__step">
                <span>03</span> Monitor
              </p>
              <p className="an-flow__step">
                <span>04</span> Support
              </p>
            </div>
          </div>

          <AeronisFrame
            variant="hero"
            caption="Product frame"
            insight="Calm companion interface — one trajectory, not a dashboard"
            className="!mt-0"
            atmosphere={<AeronisHeroAtmosphere />}
          >
            <AeronisHeroPanel />
          </AeronisFrame>
        </div>
      </section>

      <section className="case-section">
        <div className="case-label">01</div>
        <h2 className="case-section-title">The real problem</h2>

        <div className="max-w-3xl border-l aeronis-context-rule pl-8">
          <div className="space-y-8">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/55">Insight</p>
              <p className="text-[clamp(22px,2.4vw,26px)] leading-[1.5] text-white/88">
                Travelers are overloaded by options. The real problem is not access to
                information — it is decision fatigue.
              </p>
              <p className="mt-5 text-[clamp(17px,1.6vw,20px)] leading-[1.6] text-white/68">
                A single trip can require dozens of interconnected decisions across routes,
                timing, accommodation, local transport, weather, and changing conditions.
              </p>
            </div>
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/55">The weight</p>
              <p className="text-[clamp(22px,2.4vw,26px)] leading-[1.5] text-white/88">
                Users spend hours comparing routes, prices, reviews, timing, weather, and
                changing conditions.
              </p>
            </div>
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/55">The gap</p>
              <p className="text-[clamp(22px,2.4vw,26px)] leading-[1.5] text-white/88">
                Information is abundant. Confidence is scarce.
              </p>
            </div>
          </div>
        </div>

        <p className="problem-accent">
          The future problem is not finding options.
          <br />
          <strong>The future problem is deciding what to do.</strong>
        </p>
      </section>

      <section className="case-section">
        <div className="case-label">02</div>
        <h2 className="case-section-title">Product goal</h2>

        <div className="max-w-3xl">
          <p className="mb-6 text-xl leading-[1.6] text-white/75">
            Build a system that reduces travel uncertainty:
          </p>
          <ul className="space-y-5 text-[clamp(22px,2vw,26px)] leading-[1.55] text-white/78">
            <li>— understands travel intent</li>
            <li>— compresses decision complexity</li>
            <li>— monitors changing conditions</li>
            <li>— guides the traveler before and during the journey</li>
          </ul>
        </div>
      </section>

      <section className="case-section">
        <div className="case-label">03</div>
        <h2 className="case-section-title">Product identity</h2>

        <p className="max-w-3xl text-[clamp(20px,2vw,24px)] leading-[1.55] text-white/78">
          SOTA Companion inherits a deep indigo atmosphere, lime-gold accents, and a butterfly
          route network — a calm intelligence layer, not an airline dashboard.
        </p>

        <SotaScreenshot
          alt="SOTA Companion splash screen with logo and trajectory line"
          caption="Splash"
          insight="The system builds a trajectory — before any booking decision"
          variant="cinematic"
        />
      </section>

      <section className="case-section">
        <div className="case-label">04</div>
        <h2 className="case-section-title">From search to guidance</h2>

        <div className="max-w-3xl space-y-6 text-[clamp(20px,2vw,24px)] leading-[1.55] text-white/78">
          <p>
            The product transforms scattered travel decisions into a single guided trajectory.
            It begins before booking and continues after arrival.
          </p>
          <p>
            Search engines return possibilities. Companions return direction.
            <br />
            Search asks users to evaluate. Companions evaluate on behalf of users.
            <br />
            Search produces work. Companionship reduces work.
          </p>
        </div>

        <AeronisFrame
          caption="Uncertainty → trajectory"
          insight="Direction, not more options — confidence, not more tabs"
        >
          <AeronisSystemPanel />
        </AeronisFrame>

        <AeronisFrame variant="cinematic" caption="Route intelligence">
          <AeronisRouteIntelligence />
        </AeronisFrame>
      </section>

      <section className="case-section">
        <div className="case-label">05</div>
        <h2 className="case-section-title">The shift</h2>

        <div className="max-w-3xl border-l aeronis-context-rule pl-8">
          <div className="space-y-8">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/55">Past</p>
              <p className="text-[clamp(22px,2.4vw,26px)] leading-[1.5] text-white/88">
                Search engines
              </p>
            </div>
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/55">Present</p>
              <p className="text-[clamp(22px,2.4vw,26px)] leading-[1.5] text-white/88">
                AI assistants
              </p>
            </div>
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/55">Next</p>
              <p className="text-[clamp(22px,2.4vw,26px)] leading-[1.5] text-white/88">
                Persistent companions
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mt-10 space-y-5 text-[clamp(20px,2vw,24px)] leading-[1.55] text-white/78">
          <p>Search answers questions. Assistants answer prompts.</p>
          <p>
            Companions understand goals. Companions maintain context. Companions remain
            present over time.
          </p>
        </div>

        <p className="problem-accent">
          This is not a feature upgrade.
          <br />
          <strong>It is a new interface layer for travel.</strong>
        </p>
      </section>

      <section className="case-section">
        <div className="case-label">06</div>
        <h2 className="case-section-title">AiSha — the companion layer</h2>

        <p className="max-w-3xl text-[clamp(20px,2vw,24px)] leading-[1.55] text-white/78">
          AiSha is not a chatbot. It is an evolving AI travel companion that understands
          intent, monitors conditions, and supports the traveler throughout the journey.
        </p>

        <AeronisFrame variant="focus" caption="System state" insight="Intent in. Guided trajectory out.">
          <AeronisAiShaPanel />
        </AeronisFrame>
      </section>

      <section className="case-section">
        <div className="case-label">07</div>
        <h2 className="case-section-title">Continuous assistance</h2>

        <p className="max-w-3xl text-[clamp(20px,2vw,24px)] leading-[1.55] text-white/78">
          SOTA does not end at checkout. The companion stays present — monitoring conditions,
          answering what changes, and guiding what comes next.
        </p>

        <AeronisFrame variant="focus" caption="Outcome" insight="A relationship, not a transaction">
          <AeronisOutcomePanel />
        </AeronisFrame>

        <p className="visual-label mt-8">Outcome: confidence across the full journey.</p>
      </section>

      <section className="case-section an-finale">
        <div className="case-label">08</div>
        <h2 className="case-section-title">The future is companionship.</h2>

        <div className="an-finale__body max-w-3xl space-y-6 text-[clamp(22px,2vw,26px)] leading-[1.55] text-white/78">
          <p>
            The next generation of travel products will not compete on search. They will
            compete on trust.
          </p>
          <p>
            Not who shows more options — who removes more uncertainty.
            <br />
            Not who displays more information — who helps people move forward with confidence.
          </p>
          <p>
            SOTA Companion is designed for that future — not a booking session, but a
            trusted travel relationship that stays present from intent to arrival and beyond.
          </p>
        </div>

        <div className="an-finale__actions mt-12 flex flex-wrap gap-4">
          <MetalButton to={homeSectionTo('projects')}>Back to cases</MetalButton>
          <MetalButton to={homeSectionTo('contacts')} variant="primary">
            Connect
          </MetalButton>
        </div>
      </section>
    </article>
  )
}

export default CaseAeronis
