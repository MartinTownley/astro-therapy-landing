import React, { useState, useEffect } from 'react'
import NavLinks from './NavLinks'

export default function SideNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    console.log('isMenuOpen changed:', isMenuOpen)
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
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
          <NavLinks layout="vertical" />
        </div>
      )}

      {/* Debug state display */}
      {/* <span className="ml-4 text-sm text-gray-600">
        {isMenuOpen ? 'OPEN' : 'CLOSED'}
      </span> */}
    </aside>
  )
}
