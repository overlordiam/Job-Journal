'use client';

import React from 'react'
import { useState } from 'react';
import { ThemeProvider } from '@/components/ui/theme-providers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from '@/components/ui/toaster';


function Providers({children}: {children: React.ReactNode}) {
  const [queryClient] = useState(() => 
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000 * 5,
          },
        },
      })
  )

  return (
    <div>
        <ThemeProvider 
        attribute='class'
        enableSystem
        disableTransitionOnChange
        >
          <Toaster />
          <QueryClientProvider client={queryClient}>
            {children}
          <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
            
        </ThemeProvider>
    </div>
  )
}

export default Providers