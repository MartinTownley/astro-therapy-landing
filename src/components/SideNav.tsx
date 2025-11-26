import { useState, useEffect } from 'react'
import NavLinks from './NavLinks'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/16/solid'

export default function SideNav() {
  const [isVisible, setIsVisible] = useState(true)

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    let lastScrollY = window.scrollY

    const controlNavbar = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 10) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', controlNavbar)

    return () => window.removeEventListener('scroll', controlNavbar)
  }, [])

  useEffect(() => {
    console.log('isMenuOpen changed:', isMobileMenuOpen)
  }, [isMobileMenuOpen])

  // === Auto-close mobile menu when viewport >= md (768ppx) ===

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mq = window.matchMedia('(min-width: 768px)')

    const handleMqChange = (e: MediaQueryListEvent) => {
      // when matches === true, viewport is >= md; close the mobile menu
      if (e.matches) setIsMobileMenuOpen(false)
    }

    // If component mounts on desktop, make sure menu is closed
    if (mq.matches) setIsMobileMenuOpen(false)

    // register listener (modern API, with fallback)
    if (mq.addEventListener) {
      mq.addEventListener('change', handleMqChange)
    } else if (mq.addListener) {
      mq.addListener(handleMqChange)
    }

    return () => {
      // React will run this block as a cleanup whenever the component unmounts, or the effect re-runs because its dependencies changed.
      if (mq.removeEventListener) {
        mq.removeEventListener('change', handleMqChange)
      } else if (mq.removeListener) {
        mq.removeListener(handleMqChange)
      }
    }
  }, [])

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // === Handle dropdown link click (for closing menu) ===

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 z-20 w-full bg-text-bg-1 border-b border-gray-500 py-4 transition-transform duration-400 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="container mx-auto grid grid-cols-12 items-center px-4">
        {/* Signature */}
        <div className="col-span-6 md:col-span-6 lg:col-start-2 md:col-start-1">
          <a href="#">
            <span className="font-sans text-theme-green-dark text-2xl [font-variant:small-caps] font-bold">
              jade zelkowicz
            </span>
          </a>
        </div>

        <div className="col-span-6 md:col-span-6 lg:col-span-4 lg:col-start-9 flex justify-end items-center">
          {/*Desktop Layout */}
          <div className="hidden md:flex">
            <NavLinks layout="horizontal" />
          </div>

          {/* Mobile Layout */}
          <div className="flex md:hidden border-0 border-gray-500 rounded-sm">
            <button
              onClick={toggleMenu}
              aria-label="Toggle Menu"
              aria-expanded={isMobileMenuOpen}
              className="cursor-pointer"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-8 w-8" />
              ) : (
                <Bars3Icon className="h-8 w-8" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Dropdown (conditionally render if menu open) */}
      <div
        className={`absolute top-full right-0 w-full bg-text-bg-1 shadow-md overflow-hidden transition-all duration-300 ease-in-out md:hidden rounded-b-lg flex justify-center text-center ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <NavLinks layout="vertical" handleLinkClick={handleLinkClick} />
      </div>

      {/* Debug state display */}
      {/* <span className="ml-4 text-sm text-gray-600">
        {isMenuOpen ? 'OPEN' : 'CLOSED'}
      </span> */}
    </nav>
  )
}
