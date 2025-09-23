import React, { useState, useEffect } from 'react'
import NavLinks from './NavLinks'
import { Bars3Icon, Bars4Icon, XMarkIcon } from '@heroicons/react/16/solid'

export default function SideNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    console.log('isMenuOpen changed:', isMenuOpen)
  }, [isMenuOpen])

  // === Auto-close mobile menu when viewport >= md (768ppx) ===

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mq = window.matchMedia('(min-width: 768px')

    const handleMqChange = (e: MediaQueryListEvent) => {
      // when matches === true, viewport is >= md; close the mobile menu
      if (e.matches) setIsMenuOpen(false)
    }

    // If component mounts on desktop, make sure menu is closed
    if (mq.matches) setIsMenuOpen(false)

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
    setIsMenuOpen(!isMenuOpen)
  }

  // === Handle dropdown link click (for closing menu) ===

  const handleLinkClick = () => {
    setIsMenuOpen(false)
    console.log('clicked')
  }

  return (
    <aside className="fixed top-0 z-20 w-full bg-text-bg-1 border-b border-gray-500 p-4 justify-end flex">
      {/*Desktop Layout */}
      <div className="hidden md:flex">
        <NavLinks layout="horizontal" />
      </div>

      {/* Mobile Layout */}
      <div className="flex md:hidden">
        <button onClick={toggleMenu} aria-label="Toggle Menu">
          {isMenuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Dropdown (conditionally render if menu open) */}
      <div
        className={`absolute top-full right-0 w-full bg-text-bg-1 shadow-md overflow-hidden transition-all duration-300 ease-in-out md:hidden rounded-b-lg flex justify-center text-center ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <NavLinks layout="vertical" handleLinkClick={handleLinkClick} />
      </div>

      {/* Debug state display */}
      {/* <span className="ml-4 text-sm text-gray-600">
        {isMenuOpen ? 'OPEN' : 'CLOSED'}
      </span> */}
    </aside>
  )
}
