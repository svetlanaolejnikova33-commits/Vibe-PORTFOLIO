const NODES = ['Problem', 'System', 'AI', 'Flow', 'Scale'] as const

/** Minimal product-system flow — cinematic, not diagram-heavy */
export function ProductFlowStrip({ className = '' }: { className?: string }) {
  return (
    <div
      className={`product-flow-strip flex flex-wrap items-center gap-x-1 gap-y-2 ${className}`}
      aria-hidden
    >
      {NODES.map((node, i) => (
        <span key={node} className="flex items-center gap-1">
          <span className="product-flow-strip__node font-sans text-[0.625rem] font-medium uppercase tracking-[0.2em] text-fog/70">
            {node}
          </span>
          {i < NODES.length - 1 ? (
            <span className="product-flow-strip__connector text-metal-mid/50" aria-hidden>
              →
            </span>
          ) : null}
        </span>
      ))}
    </div>
  )
}
