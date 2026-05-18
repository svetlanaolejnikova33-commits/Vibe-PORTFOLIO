export function OsaFinalePresence() {
  return (
    <div className="osa-finale-presence" aria-hidden>
      <div className="osa-finale-presence__glow" />
      <p className="osa-finale-presence__ghost">OSA CORE</p>
      <div className="osa-finale-presence__grid" />

      <svg
        className="osa-finale-presence__map"
        viewBox="0 0 480 360"
        fill="none"
        preserveAspectRatio="xMaxYMid slice"
      >
        <path d="M200 180 L340 95" className="osa-finale-presence__line" />
        <path d="M200 180 L380 180" className="osa-finale-presence__line" />
        <path d="M200 180 L320 285" className="osa-finale-presence__line" />
        <path d="M200 180 L120 120" className="osa-finale-presence__line osa-finale-presence__line--dim" />
        <path
          d="M200 180 L340 95 L380 180"
          className="osa-finale-presence__line osa-finale-presence__line--branch"
        />
        <path
          d="M200 180 L380 180 L320 285"
          className="osa-finale-presence__line osa-finale-presence__line--pulse"
        />

        <circle
          cx="200"
          cy="180"
          r="3"
          className="osa-finale-presence__node osa-finale-presence__node--hub"
        />
        <circle cx="340" cy="95" r="2" className="osa-finale-presence__node" />
        <circle cx="380" cy="180" r="2" className="osa-finale-presence__node" />
        <circle cx="320" cy="285" r="2" className="osa-finale-presence__node" />
        <circle cx="120" cy="120" r="1.5" className="osa-finale-presence__node osa-finale-presence__node--dim" />
        <circle cx="280" cy="220" r="1.5" className="osa-finale-presence__node osa-finale-presence__node--dim" />
      </svg>
    </div>
  )
}
