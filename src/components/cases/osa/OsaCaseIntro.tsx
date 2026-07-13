import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { MetalButton } from '../../MetalButton'
import { releaseAppScrollLock } from '../../../navigation/appScrollLock'
import { scheduleScrollToHomeSection } from '../../../navigation/backToCases'
import { homeSectionTo, PROJECTS_SECTION_ID } from '../../../routes'
import { OsaHeroActivation } from './OsaHeroActivation'
import { useOsaReducedMotion } from './hooks/useOsaReducedMotion'

export function OsaCaseIntro() {
  const reduced = useOsaReducedMotion()
  const [activated, setActivated] = useState(reduced)
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null)
  const handleActivationComplete = useCallback(() => setActivated(true), [])

  useLayoutEffect(() => {
    const el = document.getElementById('osa-activation-mount')
    setPortalRoot((prev) => (prev === el ? prev : el))
  }, [])

  useEffect(() => {
    const mount = portalRoot
    if (!mount) return

    const live = !activated
    mount.classList.toggle('osa-activation-mount--live', live)

    if (activated) releaseAppScrollLock()

    return () => {
      mount.classList.remove('osa-activation-mount--live')
    }
  }, [activated, portalRoot])

  useEffect(() => () => releaseAppScrollLock(), [])

  return (
    <header
      className={[
        'osa-intro case-section !mt-0',
        activated ? 'osa-intro--ready' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {!activated && portalRoot
        ? createPortal(<OsaHeroActivation onComplete={handleActivationComplete} />, portalRoot)
        : null}

      <div
        className={[
          'osa-intro__body',
          activated ? 'osa-intro__body--in' : 'osa-intro__body--waiting',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="osa-intro__actions mb-10">
          <MetalButton
            to={homeSectionTo(PROJECTS_SECTION_ID)}
            onClick={() => {
              releaseAppScrollLock()
              scheduleScrollToHomeSection(PROJECTS_SECTION_ID)
            }}
          >
            Back to cases
          </MetalButton>
        </div>

        <p className="osa-intro__kicker">CASE · AI-NATIVE PRODUCT</p>
        <h2 className="osa-intro__title">OSA — Object Space Architecture</h2>
        <p className="osa-intro__lead">
          An evolving AI-native platform for interior designers — connecting visual workflow,
          scene analysis, material decisions, and manufacturer/source registry architecture into
          one operational product surface.
        </p>

        <ul className="osa-capability-frame" aria-label="OSA capability status">
          <li className="osa-capability-frame__item">
            <span className="osa-capability-frame__label">Implemented / Prototyped</span>
            <span className="osa-capability-frame__text">
              AI interior generation · image/interior analysis · visual workflow · material
              selection · interactive product interface · manufacturer/source registry architecture
            </span>
          </li>
          <li className="osa-capability-frame__item">
            <span className="osa-capability-frame__label">Interaction Prototype</span>
            <span className="osa-capability-frame__text">
              Beat cinema: Input → Read → Mutate → Procure → Handoff — designed and tested
              interaction logic for operational design intelligence
            </span>
          </li>
          <li className="osa-capability-frame__item">
            <span className="osa-capability-frame__label">Product Vision</span>
            <span className="osa-capability-frame__text">
              Live supplier syncing · production procurement orchestration · BIM export · fully
              automated execution-ready industrial output
            </span>
          </li>
        </ul>
      </div>
    </header>
  )
}
