import React from 'react'
import LinksDropdown from './LinksDropdown'
import ThemeToggle from './ThemeToggle'
import { UserButton } from '@clerk/nextjs'

function NavBar() {
  return (
    <nav className="bg-muted py-4 lg:px-24 sm:px-16 px-4 flex items-center justify-between">
        <div>
          <LinksDropdown />
        </div>
        <div className="flex items-center gap-x-4">
            <ThemeToggle />
            <UserButton afterSignOutUrl='/' />
        </div>
    </nav>
  )
}

export default NavBar