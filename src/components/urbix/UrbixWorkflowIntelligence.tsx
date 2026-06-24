import { urbixAssets } from './urbixAssets'
import { urbixCopy } from './urbixCopy'

/** Workflow intelligence layer — product screenshot slot */
export function UrbixWorkflowIntelligence() {
  const { panels, analysisFindings } = urbixCopy

  return (
    <div className="ux-workflow">
      <picture className="ux-workflow__picture">
        <source media="(min-width: 768px)" srcSet={urbixAssets.analysisDesktop} />
        <img
          src={urbixAssets.analysisMobile}
          alt={analysisFindings.analysisImageAlt}
          className="ux-workflow__img ux-workflow__img--analysis"
          loading="lazy"
          decoding="async"
        />
      </picture>
      <div className="ux-workflow__caption">
        <p className="ux-workflow__label">{panels.analysisLabel}</p>
        <p className="ux-workflow__text">{panels.analysisText}</p>
      </div>
    </div>
  )
}
