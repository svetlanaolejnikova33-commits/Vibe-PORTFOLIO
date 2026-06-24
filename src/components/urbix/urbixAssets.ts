const base = `${import.meta.env.BASE_URL}cases/urbix`

export const urbixAssets = {
  frameworkDesktop: `${base}/urbix-framework-desktop.png`,
  frameworkMobile: `${base}/urbix-framework-mobile.png`,
  analysisDesktop: `${base}/urbix-analysis-desktop.png`,
  analysisMobile: `${base}/urbix-analysis-mobile.png`,
} as const

export type UrbixAssetKey = keyof typeof urbixAssets
