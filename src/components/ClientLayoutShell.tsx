'use client'

import dynamic from 'next/dynamic'
import { ReactNode } from 'react'

const StarsBackground = dynamic(() => import('@/components/globe/StarsBackground'), { ssr: false })
import { Canvas } from '@react-three/fiber'

export default function ClientLayoutShell({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="absolute inset-0 z-0 pointer-events-none w-full h-full">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }} style={{ width: '100vw', height: '100vh' }}>
          <StarsBackground numStars={1000} />
        </Canvas>
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </>
  )
}
