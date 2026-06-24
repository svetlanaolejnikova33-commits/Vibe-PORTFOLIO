const base = `${import.meta.env.BASE_URL}cases/aeronis`

export const aeronisAssets = {
  splashDesktop: `${base}/sota-splash-desktop.png`,
  splashMobile: `${base}/sota-splash-mobile.png`,
  companionDesktop: `${base}/sota-companion-desktop.png`,
  companionMobile: `${base}/sota-companion-mobile.png`,
} as const
