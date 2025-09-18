import React from 'react'
import LinkContainer from './LinkContainer'

export default function SideNav() {
  return (
    <aside className="bg-white sticky top-0 z-20 mx-auto flex w-full items-center justify-between border-b border-gray-500 p-8">
      <LinkContainer />
    </aside>
  )
}
