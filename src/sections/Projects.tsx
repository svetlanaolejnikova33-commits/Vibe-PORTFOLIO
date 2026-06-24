import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import { Fragment, type PointerEvent, useRef } from 'react'
import type { To } from 'react-router-dom'
import { MetalButton } from '../components/MetalButton'
import { OsaFlagshipCard, type OsaFlagshipData } from '../components/projects/OsaFlagshipCard'
import { urbixCopy } from '../components/urbix/urbixCopy'
import { ProductFlowStrip } from '../components/ProductFlowStrip'
import { SteelReflex } from '../components/SteelReflex'
import { usePreferLiteMotion } from '../hooks/usePreferLiteMotion'

type ProductLayers = {
  label: string
  whyToolsFail: string
  systemLogic: string
  aiLayer: string
  workflow: string
  scalability: string
}

type ProjectEntry =
  | {
      kind: 'case-study'
      layers: ProductLayers
      title: string
      subtitle: string
      body: string
      solution: string[]
      outcome: string
      caseHref?: string
      caseTo?: To
    }
  | {
      kind: 'brief'
      layers: ProductLayers
      title: string
      subtitle: string
      body: string
      problem: string[]
      solution: string[]
      resultLead: string
      resultAccent: string
      caseHref?: string
      caseTo?: To
    }
  | {
      kind: 'linked'
      layers: ProductLayers
      title: string
      body: string
      caseTo: To
    }
  | {
      kind: 'flagship'
      id: string
    } & OsaFlagshipData
  | {
      kind: 'in-development'
      slotId: string
      body: string
    }

const projects: ProjectEntry[] = [
  {
    kind: 'flagship',
    id: 'osa',
    title: 'OSA',
    microLabels: ['B2B Infrastructure', 'AI+BIM Ecosystem', 'Live Registry System'],
    headline: 'Interior intelligence infrastructure',
    subheadline:
      'Transforms visual concepts into procurement-ready scenarios — bound to real products, suppliers, BIM logic, and budget structures.',
    body:
      'An AI+BIM+Registry ecosystem for the interior industry. Designers, suppliers, specifications, and live SKU intelligence operate on one spatial network layer.',
    insights: [
      {
        tag: 'System fracture',
        text: 'Visualization and procurement exist in disconnected realities.',
      },
      {
        tag: 'Delivery drift',
        text: 'The built result drifts from the approved concept.',
      },
      {
        tag: 'Registry gap',
        text: 'Specifications lack live product intelligence until procurement pressure arrives.',
      },
      {
        tag: 'Budget latency',
        text: 'Financial scenarios form after design commitment — not during concept alignment.',
      },
    ],
    capabilities: [
      {
        label: 'AI + BIM core',
        text: 'Spatial inference from visuals into structured specification logic.',
      },
      {
        label: 'Live registry',
        text: 'SKU graphs, suppliers, and availability mapped to design decisions.',
      },
      {
        label: 'Procurement logic',
        text: 'Budget tiers and scenarios tied to real factories and materials.',
      },
      {
        label: 'Network substrate',
        text: 'One data layer for designers, architects, and supplier ecosystems.',
      },
    ],
    resultLead: 'Visualization stops terminating at the render.',
    resultAccent: 'It becomes infrastructure for how interiors are specified, priced, and produced.',
    caseTo: '/case/osa',
  },
  {
    kind: 'case-study',
    layers: {
      label: 'Brand · Premium Fabrication',
      whyToolsFail: 'Template builders optimize layout, not perception shift or premium positioning logic.',
      systemLogic: 'Material story → trust architecture → calm conversion path as one brand system.',
      aiLayer: 'AI-assisted copy architecture, visual direction, and rapid iteration on positioning variants.',
      workflow: 'Discovery → perception map → editorial landing → launch-ready presence.',
      scalability: 'Modular brand blocks reusable across campaigns, catalogs, and future product lines.',
    },
    title: 'VD Furniture Workshop',
    subtitle:
      'Repositioning custom furniture production\nfrom **local workshop** to **premium fabrication studio**',
    body:
      'A 10+ year manufacturer needed high-segment clients—not more traffic.\n\nThe product challenge: change perception before changing the sales conversation.',
    solution: [
      'Brand meaning architecture',
      'Perception-level positioning',
      'Identity system + logo',
      'Landing as an attention scenario',
    ],
    outcome: 'From local craftsman to a **systemic brand** with market weight.',
    caseTo: '/case/vd',
  },
  {
    kind: 'brief',
    layers: {
      label: 'Consumer AI · Travel Companion',
      whyToolsFail: 'Booking platforms return fares and filters; they don\'t reduce uncertainty or guide the full journey.',
      systemLogic: 'Intent capture → trajectory guidance → condition monitoring → continuous assistance.',
      aiLayer: 'AiSha companion — trip planning, discovery, monitoring, decision support, travel memory.',
      workflow: 'Express intent → receive guided trajectory → monitor conditions → travel with clarity.',
      scalability: 'Extensible to multi-destination trips, voice interaction, and post-arrival support.',
    },
    title: 'SOTA Companion',
    subtitle:
      'An AI travel companion that turns\n**uncertainty into trajectory**',
    body:
      'A calm intelligence layer for people who don\'t need more tabs — they need confidence.\n\nNot flight search. Continuous travel guidance before, during, and after the journey.',
    problem: [
      'uncertainty across where, when, and what to book',
      'tools return information, not confidence',
      'no companion through changing trip conditions',
    ],
    solution: [
      'understands travel intent conversationally',
      'compresses decisions into one guided trajectory',
      'monitors conditions and supports the full journey',
    ],
    resultLead: 'The traveler gains a',
    resultAccent: '**trusted travel relationship**—not another booking session.',
    caseTo: '/case/aeronis',
  },
  {
    kind: 'linked',
    layers: {
      label: 'Mobile Product · Estimation',
      whyToolsFail: 'Generic calculators ignore room logic, material tiers, and fast on-site decision flow.',
      systemLogic: 'Room model → cost layers → instant estimate → shareable output.',
      aiLayer: 'Smart defaults, material suggestions, scenario presets.',
      workflow: 'Measure → configure → estimate → share with contractor or client.',
      scalability: 'Regional pricing modules, B2B white-label, renovation marketplace hooks.',
    },
    title: 'RoomCost',
    body: 'Mobile product for fast renovation estimation—built for clarity under time pressure.',
    caseTo: '/case/roomcost',
  },
  {
    kind: 'brief',
    layers: {
      label: urbixCopy.portfolio.label,
      whyToolsFail: urbixCopy.portfolio.whyToolsFail,
      systemLogic: urbixCopy.portfolio.systemLogic,
      aiLayer: urbixCopy.portfolio.aiLayer,
      workflow: urbixCopy.portfolio.workflow,
      scalability: urbixCopy.portfolio.scalability,
    },
    title: 'URBIX',
    subtitle: urbixCopy.portfolio.subtitle,
    body: urbixCopy.portfolio.body,
    problem: [...urbixCopy.portfolio.problem],
    solution: [...urbixCopy.portfolio.solution],
    resultLead: urbixCopy.portfolio.resultLead,
    resultAccent: urbixCopy.portfolio.resultAccent,
    caseTo: '/case/urbix',
  },
  {
    kind: 'in-development',
    slotId: 'dev-slot-2',
    body: 'Next AI-native product concept in build.\nEntering the portfolio soon.',
  },
]

/** Локальные акценты: оборачивайте фразы в **двойные звёздочки** — один сплошной акцент, без лишнего свечения. */
function AccentInline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          const inner = part.slice(2, -2)
          return (
            <span key={`${inner}-${i}`} className="font-medium text-accent">
              {inner}
            </span>
          )
        }
        return <Fragment key={i}>{part}</Fragment>
      })}
    </>
  )
}

function AccentMultiline({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  const lines = text.split('\n')
  return (
    <p className={className}>
      {lines.map((line, li) => (
        <Fragment key={li}>
          {li > 0 ? <br /> : null}
          <AccentInline text={line} />
        </Fragment>
      ))}
    </p>
  )
}

function ProductLayersBlock({ layers }: { layers: ProductLayers }) {
  const rows: { key: string; label: string; value: string }[] = [
    { key: 'gap', label: 'Why tools fail', value: layers.whyToolsFail },
    { key: 'sys', label: 'System logic', value: layers.systemLogic },
    { key: 'ai', label: 'AI layer', value: layers.aiLayer },
    { key: 'flow', label: 'User workflow', value: layers.workflow },
    { key: 'scale', label: 'Scalability', value: layers.scalability },
  ]

  return (
    <div className="product-layers mt-6 border-t border-white/[0.08] pt-6">
      <ProductFlowStrip className="mb-5" />
      <dl className="space-y-3.5">
        {rows.map((row) => (
          <div key={row.key} className="product-layers__row grid gap-1 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
            <dt className="text-[0.625rem] font-medium uppercase tracking-[0.18em] text-metal-mid">
              {row.label}
            </dt>
            <dd className="text-sm font-normal leading-[1.62] text-fog/88">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

function BulletList({ items, dashClass }: { items: string[]; dashClass: string }) {
  return (
    <ul className="mt-3 space-y-2.5 pl-0">
      {items.map((line) => (
        <li key={line} className="flex gap-2.5 text-sm font-normal leading-[1.65] text-fog/90">
          <span className={`shrink-0 ${dashClass}`} aria-hidden>
            —
          </span>
          <span>{line}</span>
        </li>
      ))}
    </ul>
  )
}

function CaseCta({
  href,
  to,
  noHeavy,
}: {
  href?: string
  to?: To
  noHeavy: boolean
}) {
  if (!href && !to) return null

  return (
    <motion.div
      className="mt-8"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{
        duration: noHeavy ? 0.4 : 0.55,
        delay: noHeavy ? 0.06 : 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <MetalButton href={href} to={to} variant="ghost">
        View case study →
      </MetalButton>
    </motion.div>
  )
}

function ProjectSlab({ project, index }: { project: ProjectEntry; index: number }) {
  const title = project.kind === 'in-development' ? 'Product in development' : project.title
  const label =
    project.kind !== 'in-development' && project.kind !== 'flagship' ? project.layers.label : null
  const isDevSlot = project.kind === 'in-development'
  const reduceMotion = useReducedMotion()
  const liteViewport = usePreferLiteMotion()
  const noHeavy = !!(reduceMotion || liteViewport)

  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sMx = useSpring(mx, { stiffness: 280, damping: 28 })
  const sMy = useSpring(my, { stiffness: 280, damping: 28 })
  const glareX = useTransform(sMx, [-0.5, 0.5], [20, 80])
  const glareY = useTransform(sMy, [-0.5, 0.5], [20, 80])
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.06), transparent 58%)`

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (noHeavy) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.div
      ref={ref}
      initial={
        noHeavy
          ? { opacity: 0, y: 22 }
          : { opacity: 0, y: 36 }
      }
      whileInView={
        noHeavy ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }
      }
      viewport={{ once: true, margin: '-8%' }}
      transition={{
        duration: noHeavy ? 0.52 : 0.9,
        ease: [0.22, 1, 0.36, 1],
        delay: index * (noHeavy ? 0.03 : 0.05),
      }}
      onPointerMove={noHeavy ? undefined : onMove}
      onPointerLeave={noHeavy ? undefined : onLeave}
      className="group relative"
    >
      <div
        className={[
          'ix-card relative overflow-hidden rounded-none border p-8 shadow-depth-sm md:p-10 md:shadow-depth-md',
          isDevSlot ? 'ix-card--dev border-white/[0.065]' : 'border-white/[0.1]',
        ].join(' ')}
        style={{
          backgroundColor: isDevSlot ? 'rgba(255, 255, 255, 0.028)' : 'rgba(255, 255, 255, 0.045)',
          boxShadow: noHeavy
            ? isDevSlot
              ? '0 8px 28px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.045), inset 0 -10px 24px rgba(0,0,0,0.24)'
              : '0 8px 32px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -12px 28px rgba(0,0,0,0.28)'
            : isDevSlot
              ? '0 12px 44px rgba(0,0,0,0.48), inset 0 1px 0 rgba(255,255,255,0.05), inset 0 -16px 40px rgba(0,0,0,0.3)'
              : '0 16px 56px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07), inset 0 -20px 48px rgba(0,0,0,0.35)',
        }}
      >
        {!noHeavy && !isDevSlot ? (
          <motion.div
            className="pointer-events-none absolute inset-0 z-[2] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: glare }}
          />
        ) : null}
        <div
          className={[
            'pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-1/3',
            isDevSlot ? 'opacity-[0.32]' : 'opacity-50',
          ].join(' ')}
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.45), transparent)',
          }}
        />
        <div className="relative z-[3]">
          {!isDevSlot ? (
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-metal-mid">Product case</p>
          ) : null}
          {label ? (
            <p className="mt-2 text-[0.625rem] font-medium uppercase tracking-[0.22em] text-accent/85">
              {label}
            </p>
          ) : null}
          <h3
            className={[
              'ui-project-card-title',
              isDevSlot ? 'text-mist/[0.86]' : 'mt-3',
            ].join(' ')}
          >
            {title}
          </h3>
          {project.kind === 'case-study' ? (
            <>
              <AccentMultiline
                text={project.subtitle}
                className="mt-4 font-normal leading-[1.7] text-fog md:leading-[1.72]"
              />
              <AccentMultiline
                text={project.body}
                className="mt-4 font-normal leading-[1.7] text-fog md:leading-[1.72]"
              />
              <ProductLayersBlock layers={project.layers} />
              <div className="mt-6">
                <p className="text-sm font-normal leading-[1.65] text-fog/90">
                  <span className="text-metal-light/80">Solution: </span>
                </p>
                <BulletList items={project.solution} dashClass="text-metal-mid/90" />
              </div>
              <p className="mt-6 border-t border-white/[0.08] pt-6 text-sm font-normal leading-[1.65] text-fog/90">
                <span className="text-metal-light/80">Outcome: </span>
                <AccentInline text={project.outcome} />
              </p>
              <CaseCta href={project.caseHref} to={project.caseTo} noHeavy={noHeavy} />
            </>
          ) : project.kind === 'brief' ? (
            <>
              <AccentMultiline
                text={project.subtitle}
                className="mt-4 font-normal leading-[1.7] text-fog md:leading-[1.72]"
              />
              <AccentMultiline
                text={project.body}
                className="mt-4 font-normal leading-[1.7] text-fog md:leading-[1.72]"
              />
              <ProductLayersBlock layers={project.layers} />
              <div className="mt-6">
                <p className="text-sm font-normal leading-[1.65] text-fog/90">
                  <span className="text-metal-light/80">Problem: </span>
                </p>
                <BulletList items={project.problem} dashClass="text-metal-mid/90" />
              </div>
              <div className="mt-6">
                <p className="text-sm font-normal leading-[1.65] text-fog/90">
                  <span className="text-metal-light/80">Solution: </span>
                </p>
                <BulletList items={project.solution} dashClass="text-metal-mid/90" />
              </div>
              <div className="mt-6 border-t border-white/[0.08] pt-6 text-sm font-normal leading-[1.72] text-fog/90">
                <p className="text-metal-light/80">Outcome: </p>
                <p className="mt-3">{project.resultLead}</p>
                <p className="mt-2">
                  <AccentInline text={project.resultAccent} />
                </p>
              </div>
              <CaseCta href={project.caseHref} to={project.caseTo} noHeavy={noHeavy} />
            </>
          ) : project.kind === 'linked' ? (
            <>
              <p className="mt-5 max-w-md whitespace-pre-line font-normal leading-[1.75] text-fog/[0.88] md:leading-[1.78]">
                {project.body}
              </p>
              <ProductLayersBlock layers={project.layers} />
              <CaseCta to={project.caseTo} noHeavy={noHeavy} />
            </>
          ) : project.kind === 'in-development' ? (
            <p className="mt-5 max-w-md whitespace-pre-line font-normal leading-[1.75] text-fog/[0.72] md:leading-[1.78]">
              {project.body}
            </p>
          ) : null}
        </div>
      </div>
    </motion.div>
  )
}

export function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden px-6 py-28 md:px-12 md:py-36 lg:px-16">
      <SteelReflex variant="projectsAmbient" />
      <div className="relative z-[1] mx-auto max-w-6xl">
        <h2 className="ui-section-title">
          <span className="ui-head-bright">Product</span>{' '}
          <span className="ui-head-soft">cases</span>
        </h2>
        <p className="mt-5 max-w-lg font-normal leading-[1.7] text-fog">
          Startup-grade concepts—problem, system logic, AI layer, workflow, and scale.
        </p>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {projects.map((p, i) =>
            p.kind === 'flagship' ? (
              <OsaFlagshipCard key={p.id} data={p} index={i} />
            ) : (
              <ProjectSlab
                key={p.kind === 'in-development' ? p.slotId : p.title}
                project={p}
                index={i}
              />
            ),
          )}
        </div>

        <p
          id="projects-cases"
          className="mt-14 scroll-mt-28 text-center text-xs font-normal text-fog/50 md:mt-16"
        >
          Full case studies on dedicated pages — including OSA flagship infrastructure preview.
        </p>
      </div>
    </section>
  )
}
