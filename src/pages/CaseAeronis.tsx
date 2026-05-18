import { AeronisFrame } from '../components/aeronis/AeronisFrame'
import { AeronisHeroAtmosphere } from '../components/aeronis/AeronisHeroAtmosphere'
import { AeronisRouteIntelligence } from '../components/aeronis/AeronisRouteIntelligence'
import {
  AeronisHeroPanel,
  AeronisIntentPanel,
  AeronisOutcomePanel,
  AeronisSystemPanel,
} from '../components/aeronis/AeronisProductUI'
import { MetalButton } from '../components/MetalButton'
import { homeSectionTo } from '../routes'

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
            <h1 className="case-title">
              A product that ends
              <br />
              endless flight search
            </h1>

            <p className="case-lead">
              A decision system that monitors routes
              <br />
              and surfaces <span className="text-[#ff7a4d]">one ranked action</span>
            </p>

            <p className="case-sublead">
              <span className="font-semibold text-white">Not a booking site.</span>
              <br />
              A compression layer for time, uncertainty, and cognitive load.
            </p>

            <div className="an-flow">
              <p className="an-flow__step">
                <span>01</span> Intent
              </p>
              <p className="an-flow__step">
                <span>02</span> Monitor
              </p>
              <p className="an-flow__step">
                <span>03</span> Rank
              </p>
              <p className="an-flow__step">
                <span>04</span> Decide
              </p>
            </div>
          </div>

          <AeronisFrame
            variant="hero"
            caption="Product frame"
            insight="One recommendation — understood in two seconds"
            className="!mt-0"
            atmosphere={<AeronisHeroAtmosphere />}
          >
            <AeronisHeroPanel />
          </AeronisFrame>
        </div>
      </section>

      <section className="case-section">
        <div className="case-label">01</div>
        <h2 className="case-section-title">Context</h2>

        <div className="max-w-3xl border-l aeronis-context-rule pl-8">
          <div className="space-y-8">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/55">User</p>
              <p className="text-[clamp(22px,2.4vw,26px)] leading-[1.5] text-white/88">
                A traveler exhausted by manual comparison across tabs.
              </p>
            </div>
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/55">Problem</p>
              <ul className="space-y-3 text-[clamp(22px,2.4vw,26px)] leading-[1.5] text-white/88">
                <li>— opens dozens of tabs</li>
                <li>— compares prices manually</li>
                <li>— never confident the best option was found</li>
              </ul>
            </div>
          </div>
        </div>

        <p className="problem-accent">No system. Only manual search.</p>
      </section>

      <section className="case-section">
        <div className="case-label">02</div>
        <h2 className="case-section-title">Product goal</h2>

        <div className="max-w-3xl">
          <p className="mb-6 text-xl leading-[1.6] text-white/75">Build a decision system that:</p>
          <ul className="space-y-5 text-[clamp(22px,2vw,26px)] leading-[1.55] text-white/78">
            <li>— monitors routes autonomously</li>
            <li>— ranks one recommendation</li>
            <li>— collapses choice to one action</li>
          </ul>
        </div>
      </section>

      <section className="case-section">
        <div className="case-label">03</div>
        <h2 className="case-section-title">System design</h2>

        <p className="max-w-3xl text-[clamp(20px,2vw,24px)] leading-[1.55] text-white/78">
          Live board data feeds a ranking layer — the interface shows one outcome, not a dashboard.
        </p>

        <AeronisFrame
          caption="System layer"
          insight="Monitoring + ranked recommendation in one calm composition"
        >
          <AeronisSystemPanel />
        </AeronisFrame>

        <AeronisFrame variant="cinematic" caption="Route intelligence">
          <AeronisRouteIntelligence />
        </AeronisFrame>
      </section>

      <section className="case-section">
        <div className="case-label">04</div>
        <h2 className="case-section-title">How it works</h2>

        <p className="max-w-3xl text-[clamp(20px,2vw,24px)] leading-[1.55] text-white/78">
          The user defines route intent and constraints once. The system handles the rest.
        </p>

        <AeronisFrame variant="focus" caption="Intent" insight="Three fields — no form clutter">
          <AeronisIntentPanel />
        </AeronisFrame>
      </section>

      <section className="case-section">
        <div className="case-label">05</div>
        <h2 className="case-section-title">Outcome</h2>

        <p className="max-w-3xl text-[clamp(20px,2vw,24px)] leading-[1.55] text-white/78">
          The product returns a ready-to-book decision — not another list to compare.
        </p>

        <AeronisFrame variant="focus" caption="Outcome" insight="A decision, not a search session">
          <AeronisOutcomePanel />
        </AeronisFrame>

        <p className="visual-label mt-8">Outcome: a decision, not a search session.</p>
      </section>

      <section className="case-section an-finale">
        <div className="case-label">06</div>
        <h2 className="case-section-title">Search ends.</h2>

        <div className="an-finale__body max-w-3xl space-y-6 text-[clamp(22px,2vw,26px)] leading-[1.55] text-white/78">
          <p>The system decides.</p>
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
