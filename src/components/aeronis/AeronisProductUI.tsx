const AISHA_STATE = [
  { label: 'Travel intent', value: 'Quiet September ocean trip' },
  { label: 'Status', value: 'Intent understood' },
  { label: 'Route confidence', value: 'High' },
  {
    label: 'Conditions',
    value: ['Weather monitored', 'Prices monitored', 'Seasonality checked'],
  },
  { label: 'Trajectory', value: 'Portugal selected' },
  { label: 'Next action', value: 'Best booking window opens in 11 days' },
] as const

const EVOLUTION = [
  { phase: 'Today', label: 'AI Travel Companion' },
  { phase: 'Next', label: 'Voice Companion' },
  { phase: 'Later', label: 'Persistent Travel Memory' },
  { phase: 'Vision', label: 'Personal Travel Operating System' },
] as const

export function AeronisHeroPanel() {
  return (
    <div className="an-ui an-panel an-panel--hero an-panel--companion">
      <p className="an-kicker">AiSha · companion layer</p>
      <p className="an-companion__presence">
        <span className="an-companion__dot" aria-hidden />
        I&apos;m here. I&apos;ll help with the route.
      </p>
      <div className="an-companion__input" role="presentation">
        <span className="an-companion__placeholder">Where do you want to go?</span>
        <span className="an-companion__send" aria-hidden>
          →
        </span>
      </div>
      <p className="an-footnote an-footnote--live">
        <span className="an-footnote__pulse" aria-hidden />
        One trajectory — not another search session
      </p>
    </div>
  )
}

export function AeronisSystemPanel() {
  return (
    <div className="an-ui an-grid an-grid--system">
      <div className="an-panel an-panel--secondary an-capability-list">
        <p className="an-kicker px-[1.125rem] pt-4">Travel uncertainty</p>
        <ul className="an-uncertainty-list">
          <li>Where should I go?</li>
          <li>When should I buy?</li>
          <li>Is this the right option?</li>
          <li>What changes during the trip?</li>
          <li>What do I do next?</li>
        </ul>
      </div>
      <div className="an-panel an-highlight an-highlight--emphasis">
        <p className="an-highlight__label">SOTA response</p>
        <p className="an-highlight__route">One guided trajectory</p>
        <p className="an-highlight__meta">
          Intent understood · conditions monitored · decisions compressed
        </p>
        <div className="an-divider" />
        <p className="an-trajectory-note">
          Current tools return information. SOTA returns confidence.
        </p>
      </div>
    </div>
  )
}

export function AeronisIntentPanel() {
  return (
    <div className="an-ui an-panel an-conversation an-panel--soft">
      <p className="an-kicker">Conversation · intent</p>
      <div className="an-conversation__turn an-conversation__turn--user">
        <p className="an-conversation__role">Traveler</p>
        <p className="an-conversation__text">
          I want a quiet September trip near the ocean.
        </p>
      </div>
      <div className="an-conversation__turn an-conversation__turn--companion">
        <p className="an-conversation__role">AiSha</p>
        <p className="an-conversation__text">
          Portugal fits best.
          <br />
          <br />
          12 days.
          <br />
          Estimated budget €1,850.
          <br />
          <br />
          The best booking window opens in 11 days.
          <br />
          <br />
          Would you like me to monitor prices and weather changes?
        </p>
      </div>
    </div>
  )
}

export function AeronisOutcomePanel() {
  return (
    <div className="an-ui an-panel an-outcome an-panel--focus an-outcome--resolved">
      <p className="an-outcome__status">Continuous assistance</p>
      <p className="an-outcome__line">Before booking. During the journey. After arrival.</p>
      <p className="an-outcome__sub">
        Not a booking session — a trusted travel relationship that reduces uncertainty at
        every step.
      </p>
    </div>
  )
}

function AishaStateValue({ value }: { value: string | readonly string[] }) {
  if (Array.isArray(value)) {
    return (
      <ul className="an-state__conditions">
        {value.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    )
  }

  return <p className="an-state__value">{value}</p>
}

export function AeronisAiShaPanel() {
  return (
    <div className="an-ui an-aisha">
      <div className="an-aisha__state an-panel an-panel--soft">
        <p className="an-kicker">AiSha · intelligence layer</p>
        <dl className="an-state">
          {AISHA_STATE.map((row) => (
            <div key={row.label} className="an-state__row">
              <dt className="an-state__label">{row.label}</dt>
              <dd>
                <AishaStateValue value={row.value} />
              </dd>
            </div>
          ))}
        </dl>
        <p className="an-aisha__caption">Intent in. Guided trajectory out.</p>
      </div>

      <ol className="an-evolution" aria-label="Product evolution">
        {EVOLUTION.map((item) => (
          <li key={item.phase} className="an-evolution__item">
            <span className="an-evolution__phase">{item.phase}</span>
            <span className="an-evolution__label">{item.label}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
