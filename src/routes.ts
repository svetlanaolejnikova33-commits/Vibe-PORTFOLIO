import type { To } from 'react-router-dom'

/** Маршрут страницы кейса (HashRouter: в адресе будет `.../#/case/vd`) */
export const CASE_VD_PATH = '/case/vd'

/** Переход на главную с прокруткой к секции по `id` на странице */
export function homeSectionTo(sectionId: string): To {
  return { pathname: '/', search: `?section=${encodeURIComponent(sectionId)}` }
}
