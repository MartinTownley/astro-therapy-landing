import React, { useState, useEffect } from 'react'
import NavLinks from './NavLinks'

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
    <aside className="bg-text-bg-2 sticky top-0 z-20 mx-auto flex w-full  items-center justify-end border-b border-gray-500 p-8">
      {/*Desktop Layout */}
      <div className="hidden md:flex">
        <NavLinks layout="horizontal" />
      </div>

      {/* Mobile Layout */}
      <div className="flex md:hidden">
        <button onClick={toggleMenu} aria-label="Toggle Menu">
          ☰
        </button>
      </div>

      {/* Dropdown (conditionally render if menu open) */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md overflow-hidden transition-all duration-300 ease-in-out md:hidden">
          <NavLinks layout="vertical" handleLinkClick={handleLinkClick} />
        </div>
      )}

      {/* Debug state display */}
      {/* <span className="ml-4 text-sm text-gray-600">
        {isMenuOpen ? 'OPEN' : 'CLOSED'}
      </span> */}
    </aside>
  )
}
