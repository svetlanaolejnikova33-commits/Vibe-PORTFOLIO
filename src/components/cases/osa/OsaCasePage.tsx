import { OsaCaseIntro } from './OsaCaseIntro'
import { OsaConclusion } from './OsaConclusion'
import { OsaEcosystemFlow } from './OsaEcosystemFlow'
import { OsaInterfaceDiagnosis } from './OsaInterfaceDiagnosis'
import { OsaProblem } from './OsaProblem'
import { OsaExecutionPackage } from './OsaExecutionPackage'
import { OsaProductCinema } from './OsaProductCinema'

export function OsaCasePage() {
  return (
    <article className="case-page case-page--osa case-page--osa-narrative case-page--osa-cinema">
      <OsaCaseIntro />
      <OsaProblem />
      <OsaInterfaceDiagnosis />
      <OsaProductCinema />
      <OsaEcosystemFlow />
      <OsaExecutionPackage />
      <OsaConclusion />
    </article>
  )
}
