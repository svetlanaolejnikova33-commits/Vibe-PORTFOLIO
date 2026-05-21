/** Lock page scroll during full-screen cinematic overlays */
export function lockAppScroll() {
  document.body.style.overflow = 'hidden'
}

/** Clear scroll locks left by cinematic overlays (OSA hero activation, etc.) */
export function releaseAppScrollLock() {
  document.body.style.overflow = ''
  document.body.style.position = ''
  document.documentElement.style.overflow = ''
}
