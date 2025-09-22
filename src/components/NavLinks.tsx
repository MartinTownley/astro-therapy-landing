export default function NavLinks({ isMobile = false }) {
  return (
    // Hidden on small screens, visible from md & up
    <div
      className={
        isMobile ? 'flex flex-col space-y-4' : 'hidden md:flex space-x-6'
      }
    >
      <a href="#" className="hover:text-gray-300">
        Home
      </a>
      <a href="#about" className="hover:text-gray-300">
        About
      </a>
      <a href="#therapy" className="hover:text-gray-300">
        Therapy
      </a>
      <a href="#sessions" className="hover:text-gray-300">
        Sessions
      </a>
      <a href="#contact" className="hover:text-gray-300">
        Contact
      </a>
    </div>
  )
}
