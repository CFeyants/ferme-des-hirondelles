'use client'

import React from 'react'
import { AuthProvider } from '@/context/AuthContext'
import { StoreProvider } from '@/context/StoreContext'
import { Toaster } from 'sonner'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <StoreProvider>
        {children}
        <Toaster position="top-center" richColors />
      </StoreProvider>
    </AuthProvider>
  )
}
