'use client'

import React from 'react'
import { Toaster } from 'sonner'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <Toaster />
    </div>
  )
}
