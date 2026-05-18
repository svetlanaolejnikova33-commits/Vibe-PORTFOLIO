import { MetalButton } from '../../MetalButton'
import { homeSectionTo } from '../../../routes'
import { OsaFigure } from './OsaFigure'
import { osaAssets } from './osaAssets'

export function OsaCaseIntro() {
  return (
    <header className="osa-intro case-section !mt-0">
      <div className="mb-10">
        <MetalButton to={homeSectionTo('projects')}>Back to cases</MetalButton>
      </div>

      <p className="osa-intro__kicker">CASE · OPERATIONAL PRODUCT</p>
      <h1 className="osa-intro__title">OSA — Object Space Architecture</h1>
      <p className="osa-intro__lead">
        A new operating layer where interior concepts become executable: visual workflow,
        semantic analysis, live registry, procurement logic, and BIM-ready output.
      </p>

      <OsaFigure
        src={osaAssets.heroPlatform}
        alt="OSA cinematic operational layer for interior execution"
        className="osa-intro__figure osa-intro__figure--cinema"
        priority
      />
    </header>
  )
}
