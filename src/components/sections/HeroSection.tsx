

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';
// ...existing code...
const StarsBackground = dynamic(() => import('@/components/globe/StarsBackground'), { ssr: false });
const GalacticGlobeApp = dynamic(() => import('@/components/globe/GlobeClientLoader'), { ssr: false });

export default function HeroSection() {
  const { t } = useTranslation('home');
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
      {/* Full-screen animated stars background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }} style={{ width: '100%', height: '100%' }}>
          <Suspense fallback={null}>
            <StarsBackground numStars={1000} />
          </Suspense>
        </Canvas>
      </div>
      {/* Three.js Globe, lazy-loaded and wrapped in Suspense for SSR safety */}
      <div className="absolute inset-0 z-10">
        <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-cyan-300">Loading...</div>}>
          <GalacticGlobeApp />
        </Suspense>
      </div>
      {/* Central content container */}
      <div className="relative z-20 w-full flex flex-col items-center justify-center text-center">
        <h1 className="text-6xl md:text-7xl font-extrabold text-cyan-400 drop-shadow-lg mb-8 transition-all duration-300">
          {t('hero.title')}
        </h1>
        <p className="mt-2 text-xl text-cyan-200 text-center opacity-80 tracking-wide mb-6 transition-all duration-300">
          {t('hero.subtitle')}
        </p>
        <div className="mt-6 mb-2 w-full flex items-center justify-center">
          <span
            className="block text-2xl md:text-3xl font-semibold text-center text-cyan-300 animate-fadeIn translate-y-2 duration-700"
            tabIndex={0}
          >
            {t('hero.slogan')}
          </span>
        </div>
      </div>
    </section>
  );
}
