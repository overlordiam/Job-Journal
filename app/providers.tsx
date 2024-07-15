'use client';

import React from 'react'
import { ThemeProvider } from '@/components/ui/theme-providers';

function Providers({children}: {children: React.ReactNode}) {
  return (
    <div>
        <ThemeProvider 
        attribute='class'
        enableSystem
        disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
    </div>
  )
}

export default Providers