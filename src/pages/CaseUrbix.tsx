import { UrbixFrame } from '../components/urbix/UrbixFrame'
import { UrbixHeroAtmosphere } from '../components/urbix/UrbixHeroAtmosphere'
import {
  UrbixFrameworkPanel,
  UrbixHeroPanel,
  UrbixMetricsPanel,
  UrbixRoiPanel,
  UrbixScorePanel,
} from '../components/urbix/UrbixProductUI'
import { UrbixWorkflowIntelligence } from '../components/urbix/UrbixWorkflowIntelligence'
import { urbixAssets } from '../components/urbix/urbixAssets'
import { urbixCopy } from '../components/urbix/urbixCopy'
import { MetalButton } from '../components/MetalButton'
import { homeSectionTo } from '../routes'

function highlightPhrase(text: string, phrase: string, className: string) {
  const index = text.indexOf(phrase)
  if (index === -1) return text

  return (
    <>
      {text.slice(0, index)}
      <span className={className}>{phrase}</span>
      {text.slice(index + phrase.length)}
    </>
  )
}

function findingToneClass(paragraph: string) {
  if (paragraph.startsWith('Strong residential')) return 'ux-finding ux-finding--positive'
  if (paragraph.startsWith('Weak urban') || paragraph.startsWith('Hidden everyday')) {
    return 'ux-finding ux-finding--neutral'
  }
  return 'ux-finding'
}

function UrbixScreenshot({
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
    <UrbixFrame caption={caption} insight={insight} variant={variant}>
      <picture className="ux-screenshot">
        <source media="(min-width: 768px)" srcSet={urbixAssets.frameworkDesktop} />
        <img
          src={urbixAssets.frameworkMobile}
          alt={alt}
          className="ux-screenshot__img ux-screenshot__img--framework"
          loading="lazy"
          decoding="async"
        />
      </picture>
    </UrbixFrame>
  )
}

export default function CaseUrbix() {
  const {
    hero,
    hiddenProblem,
    metricsFail,
    lifeReadinessFramework,
    analysisFindings,
    residentModifications,
    lifeReadinessScore,
    recommendationsRoi,
    finale,
  } = urbixCopy

  const { panels } = urbixCopy
  const frameworkDimensionLabels = [
    ...panels.frameworkDimensions.map((item) => item.phase),
    ...panels.frameworkStateRows.slice(0, 3).map((row) => row.label),
  ]

  return (
    <article className="case-page case-page--urbix">
      {/* 01 — Hero */}
      <section className="case-section ux-section--hero !mt-0">
        <div className="mb-10 flex flex-wrap items-center gap-4">
          <MetalButton to={homeSectionTo('projects')}>Back to cases</MetalButton>
        </div>

        <div className="case-label">01</div>

        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-start lg:gap-14">
          <div>
            <p className="ux-brand-kicker">{hero.kicker}</p>
            <h1 className="case-title">
              {highlightPhrase(hero.title, 'how well people will live there', 'ux-accent-text')}
            </h1>
            <p className="case-lead">{hero.lead}</p>
            <p className="case-sublead">
              <span className="font-semibold text-white">{hero.subleadBold}</span>
              <br />
              {hero.subleadRest}
            </p>
            <div className="ux-flow">
              {hero.pillars.map((pillar, index) => (
                <p key={pillar} className="ux-flow__step">
                  <span>{String(index + 1).padStart(2, '0')}</span> {pillar}
                </p>
              ))}
            </div>
          </div>

          <UrbixFrame
            variant="hero"
            caption={hero.frameCaption}
            insight={hero.frameInsight}
            className="!mt-0"
            atmosphere={<UrbixHeroAtmosphere />}
          >
            <UrbixHeroPanel />
          </UrbixFrame>
        </div>
      </section>

      {/* 02 — The hidden problem */}
      <section className="case-section ux-section--hidden-problem">
        <div className="case-label">02</div>
        <h2 className="case-section-title">{hiddenProblem.title}</h2>
        <div className="max-w-3xl border-l urbix-context-rule pl-8">
          <div className="space-y-8">
            {hiddenProblem.blocks.map((block) => (
              <div key={block.label}>
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/55">{block.label}</p>
                <p className="text-[clamp(22px,2.4vw,26px)] leading-[1.5] text-white/88">{block.body}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="problem-accent">
          {hiddenProblem.accentLead}
          <br />
          <strong>{hiddenProblem.accentStrong}</strong>
        </p>
      </section>

      {/* 03 — Why traditional development metrics fail */}
      <section className="case-section ux-section--metrics">
        <div className="case-label">03</div>
        <h2 className="case-section-title">{metricsFail.title}</h2>
        <div className="max-w-3xl">
          <p className="mb-6 text-xl leading-[1.6] text-white/75">{metricsFail.intro}</p>
          <ul className="ux-metrics-bullets space-y-5 text-[clamp(22px,2vw,26px)] leading-[1.55] text-white/78">
            {metricsFail.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <UrbixFrame caption={metricsFail.frameCaption} insight={metricsFail.frameInsight}>
          <UrbixMetricsPanel />
        </UrbixFrame>
      </section>

      {/* 04 — URBIX Life Readiness Framework */}
      <section className="case-section ux-section--framework">
        <div className="case-label">04</div>
        <h2 className="case-section-title">{lifeReadinessFramework.title}</h2>
        <p className="max-w-3xl text-[clamp(20px,2vw,24px)] leading-[1.55] text-white/78">
          {lifeReadinessFramework.body}
        </p>
        <ul className="ux-dimension-strip max-w-3xl">
          {frameworkDimensionLabels.map((label) => (
            <li key={label} className="ux-dimension-strip__item">
              <span className="ux-dimension-strip__signal" aria-hidden />
              <span className="ux-dimension-strip__label">{label}</span>
            </li>
          ))}
        </ul>
        <UrbixScreenshot
          alt={lifeReadinessFramework.screenshotAlt}
          caption={lifeReadinessFramework.screenshotCaption}
          insight={lifeReadinessFramework.screenshotInsight}
          variant="cinematic"
        />
        <UrbixFrame
          variant="focus"
          caption={lifeReadinessFramework.frameCaption}
          insight={lifeReadinessFramework.frameInsight}
        >
          <UrbixFrameworkPanel />
        </UrbixFrame>
      </section>

      {/* 05 — Analysis findings */}
      <section className="case-section ux-section--findings">
        <div className="case-label">05</div>
        <h2 className="case-section-title">{analysisFindings.title}</h2>
        <div className="max-w-3xl space-y-6 text-[clamp(20px,2vw,24px)] leading-[1.55] text-white/78">
          {analysisFindings.body.map((paragraph) => (
            <p key={paragraph} className={findingToneClass(paragraph)}>
              {paragraph}
            </p>
          ))}
        </div>
        <UrbixFrame variant="cinematic" caption={analysisFindings.frameCaption} insight={analysisFindings.frameInsight}>
          <UrbixWorkflowIntelligence />
        </UrbixFrame>
      </section>

      {/* 06 — Future resident modifications */}
      <section className="case-section ux-section--modifications">
        <div className="case-label">06</div>
        <h2 className="case-section-title">{residentModifications.title}</h2>
        <p className="max-w-3xl text-[clamp(20px,2vw,24px)] leading-[1.55] text-white/78">
          {residentModifications.body}
        </p>
        <div className="max-w-3xl border-l urbix-context-rule pl-8">
          <div className="space-y-8">
            {residentModifications.blocks.map((block) => (
              <div key={block.label} className="ux-mod-block">
                <p className="ux-mod-label mb-3 text-xs uppercase tracking-[0.2em]">{block.label}</p>
                <p className="text-[clamp(22px,2.4vw,26px)] leading-[1.5] text-white/88">{block.body}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="problem-accent">
          {residentModifications.accentLead}
          <br />
          <strong>{residentModifications.accentStrong}</strong>
        </p>
      </section>

      {/* 07 — Life Readiness Score */}
      <section className="case-section ux-section--score">
        <div className="case-label">07</div>
        <h2 className="case-section-title">{lifeReadinessScore.title}</h2>
        <p className="max-w-3xl text-[clamp(20px,2vw,24px)] leading-[1.55] text-white/78">
          {lifeReadinessScore.body}
        </p>
        <UrbixFrame
          variant="focus"
          caption={lifeReadinessScore.frameCaption}
          insight={lifeReadinessScore.frameInsight}
        >
          <UrbixScorePanel />
        </UrbixFrame>
        <p className="visual-label mt-8">{lifeReadinessScore.visualLabel}</p>
      </section>

      {/* 08 — Recommendations & ROI impact */}
      <section className="case-section ux-section--roi">
        <div className="case-label">08</div>
        <h2 className="case-section-title">{recommendationsRoi.title}</h2>
        <p className="max-w-3xl text-[clamp(20px,2vw,24px)] leading-[1.55] text-white/78">
          {recommendationsRoi.body}
        </p>
        <UrbixFrame
          variant="focus"
          caption={recommendationsRoi.frameCaption}
          insight={recommendationsRoi.frameInsight}
        >
          <UrbixRoiPanel />
        </UrbixFrame>
      </section>

      {/* 09 — Finale */}
      <section className="case-section ux-finale">
        <div className="case-label">09</div>
        <h2 className="case-section-title">
          {highlightPhrase(finale.title, 'life intelligence', 'ux-accent-text')}
        </h2>
        <div className="ux-finale__body max-w-3xl space-y-6 text-[clamp(22px,2vw,26px)] leading-[1.55] text-white/78">
          {finale.body.map((paragraph) => (
            <p key={paragraph}>
              {paragraph.includes('how well people will live there')
                ? highlightPhrase(paragraph, 'how well people will live there', 'ux-accent-text')
                : paragraph}
            </p>
          ))}
        </div>
        <div className="ux-finale__actions mt-12 flex flex-wrap gap-4">
          <MetalButton to={homeSectionTo('projects')}>Back to cases</MetalButton>
          <MetalButton to={homeSectionTo('contacts')} variant="primary">
            Connect
          </MetalButton>
        </div>
      </section>
    </article>
  )
}
