import type { To } from 'react-router-dom'

export { useBackToCases, PROJECTS_SECTION_ID, scheduleScrollToHomeSection } from './navigation/backToCases'

/** Маршрут страницы кейса (HashRouter: в адресе будет `.../#/case/vd`) */
export const CASE_VD_PATH = '/case/vd'
export const CASE_ROOMCOST_PATH = '/case/roomcost'
export const CASE_OSA_PATH = '/case/osa'
export const CASE_URBIX_PATH = '/case/urbix'

/** Переход на главную с прокруткой к секции по `id` на странице */
export function homeSectionTo(sectionId: string): To {
  return { pathname: '/', search: `?section=${encodeURIComponent(sectionId)}` }
}
