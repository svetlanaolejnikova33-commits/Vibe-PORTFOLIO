export const contactLinks = {
  telegram: {
    href: 'https://t.me/Svetlana_Oleynikova',
    display: '@Svetlana_Oleynikova',
  },
  linkedIn: {
    href: 'https://www.linkedin.com/in/svetlanaoleynikova',
    display: 'svetlanaoleynikova',
  },
  email: {
    href: 'mailto:svetlanaolejnikova33@gmail.com',
    display: 'svetlanaolejnikova33@gmail.com',
  },
} as const

export const contactChannels = [
  { label: 'Telegram' as const, ...contactLinks.telegram, external: true },
  { label: 'LinkedIn' as const, ...contactLinks.linkedIn, external: true },
  { label: 'Email' as const, ...contactLinks.email, external: false },
]
