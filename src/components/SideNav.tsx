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
    <aside className="bg-white sticky top-0 z-20 mx-auto flex w-full  items-center justify-end border-b border-gray-500 p-8">
      {/*Desktop Links */}
      <NavLinks />

      {/*Hamburger (Mobile Only) */}
      <button
        className="md:hidden"
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        {/* later add hamburger icon here */}☰
      </button>

      {/* Mobile (conditionally render) */}
      <div
        className={`absolute top-full left-0 w-full bg-white shadow-md overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4">
          <NavLinks isMobile />
        </div>
      </div>
      {/* Debug state display */}
      {/* <span className="ml-4 text-sm text-gray-600">
        {isMenuOpen ? 'OPEN' : 'CLOSED'}
      </span> */}
    </aside>
  )
}
