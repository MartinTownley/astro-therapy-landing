type NavLinksProps = {
  layout?: 'horizontal' | 'vertical'
  handleLinkClick?: () => void
  variant?: 'light' | 'dark'
  activeSection?: string
}

export default function NavLinks({
  layout = 'horizontal',
  handleLinkClick,
  variant = 'dark',
  activeSection = '',
}: NavLinksProps) {
  const baseClasses =
    variant === 'light'
      ? 'text-white/90 hover:text-white font-medium tracking-wide border-b-2 border-transparent transition-colors duration-300'
      : 'text-gray-800 hover:text-theme-green font-medium tracking-wide border-b-2 border-transparent transition-colors duration-300'

  const activeClasses =
    variant === 'light'
      ? 'text-white font-semibold tracking-wide border-b-2 border-white'
      : 'text-theme-green-dark font-semibold tracking-wide border-b-2 border-theme-green-dark'

  const links = [
    { href: '#about', label: 'about' },
    { href: '#approach', label: 'approach' },
    { href: '#what-to-expect', label: 'process' },
    { href: '#contact', label: 'contact' },
  ]

  return (
    // Hidden on small screens, visible from md & up
    <div
      className={layout === 'horizontal' ? 'flex space-x-6' : 'flex flex-col'}
    >
      {links.map((link) => {
        const isActive = activeSection === link.href.replace('#', '')
        const classes = layout === 'horizontal'
          ? `px-4 py-2 ${isActive ? activeClasses : baseClasses}`
          : `px-4 py-6 border-b border-gray-200 ${isActive ? activeClasses : baseClasses}`
        return (
          <a
            key={link.href}
            href={link.href}
            onClick={handleLinkClick}
            className={classes}
          >
            {link.label}
          </a>
        )
      })}
    </div>
  )
}
