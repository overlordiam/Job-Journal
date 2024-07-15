import NavBar from '@/components/NavBar'
import Sidebar from '@/components/Sidebar'
import React from 'react'

function layout({children}: {children: React.ReactNode}) {
  return (
    <div className="grid lg:grid-cols-5">
      {/* Hide on small screen*/}
      <div className="hidden lg:block lg:col-span-1 lg:min-h-screen">
        <Sidebar />
      </div>
      {/* Hide on large screen */}
      <div className="col-span-4">
        <NavBar />
        <div className="py-16 px-4 sm:px-8 lg:px-16">{children}</div>
      </div>
    </div>
  )
}

export default layout