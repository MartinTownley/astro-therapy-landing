export default function NavLinks({ layout = 'horizontal' }) {
  const baseClasses = 'hover:text-gray-500'

  return (
    // Hidden on small screens, visible from md & up
    <div
      className={
        layout === 'horizontal' ? 'flex space-x-6' : 'flex flex-col space-y-4'
      }
    >
      <a href="#" className={baseClasses}>
        Home
      </a>
      <a href="#about" className={baseClasses}>
        About
      </a>
      <a href="#therapy" className={baseClasses}>
        Therapy
      </a>
      <a href="#sessions" className={baseClasses}>
        Sessions
      </a>
      <a href="#contact" className={baseClasses}>
        Contact
      </a>
    </div>
  )
}
