type NavLinksProps = {
  layout?: 'horizontal' | 'vertical'
  handleLinkClick?: () => void
}

export default function NavLinks({
  layout = 'horizontal',
  handleLinkClick,
}: NavLinksProps) {
  const baseClasses = 'text-grey-800 hover:text-theme-green font-medium'

  const links = [
    { href: '#home', label: 'home' },
    { href: '#about', label: 'about' },
    { href: '#therapy', label: 'therapy' },
    { href: '#sessions', label: 'sessions' },
    { href: '#contact', label: 'contact' },
  ]

  const linkClasses =
    layout === 'horizontal'
      ? `px-4 py-2 ${baseClasses}`
      : `px-4 py-6 border-b border-gray-200 ${baseClasses}`

  return (
    // Hidden on small screens, visible from md & up
    <div
      className={layout === 'horizontal' ? 'flex space-x-6' : 'flex flex-col'}
    >
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          onClick={handleLinkClick}
          className={linkClasses}
        >
          {link.label}
        </a>
      ))}
    </div>
  )
}
