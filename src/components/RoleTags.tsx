const ROLES = [
  'AI Product Designer',
  'AI Systems Designer',
  'Creative Technologist',
  'AI Workflow Architect',
  'Product Visionary',
] as const

export function RoleTags({ className = '' }: { className?: string }) {
  return (
    <ul className={`role-tags flex flex-wrap gap-x-3 gap-y-2 ${className}`} aria-label="Target roles">
      {ROLES.map((role) => (
        <li key={role}>
          <span className="role-tag inline-block font-sans text-[0.625rem] font-normal uppercase tracking-[0.22em] text-mist/58 md:text-[0.65625rem]">
            {role}
          </span>
        </li>
      ))}
    </ul>
  )
}
