type NavLinksProps = {
  layout?: 'horizontal' | 'vertical'
  handleLinkClick?: () => void
}

export default function NavLinks({
  layout = 'horizontal',
  handleLinkClick,
}: NavLinksProps) {
  const baseClasses = 'hover:text-gray-500'

  const links = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About Me' },
    { href: '#therapy', label: 'Therapy' },
    { href: '#sessions', label: 'Sessions' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    // Hidden on small screens, visible from md & up
    <div
      className={
        layout === 'horizontal' ? 'flex space-x-6' : 'flex flex-col space-y-4'
      }
    >
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          onClick={handleLinkClick}
          className={baseClasses}
        >
          {link.label}
        </a>
      ))}
    </div>
  )
}
