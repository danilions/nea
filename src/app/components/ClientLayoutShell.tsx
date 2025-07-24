'use client'

import dynamic from 'next/dynamic'
import { ReactNode } from 'react'

const StarsBackground = dynamic(() => import('@/components/globe/StarsBackground'), { ssr: false })

export default function ClientLayoutShell({ children }: { children: ReactNode }) {
  return (
    <>
      <StarsBackground />
      {children}
    </>
  )
}
