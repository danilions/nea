"use client";

import '../../i18n';
import GlobeClientLoader from '@/components/globe/GlobeClientLoader';
import ClientOnly from './components/ClientOnly';
import { useTranslation } from 'react-i18next'

export default function Page() {
  const { t, i18n } = useTranslation('home');

  // Wait for i18n to be initialized before rendering to avoid hydration mismatch
  if (!i18n.isInitialized) {
    return null; // Optionally, return a loading spinner here
  }

  return (
    <ClientOnly>
      {/* Globe always rendered first, full screen, z-50 to guarantee visibility */}
      <div className="fixed inset-0 z-50 w-screen h-screen">
        <GlobeClientLoader />
      </div>
      <main className="relative min-h-screen flex flex-col items-center justify-center bg-black px-6 overflow-hidden" aria-label="Homepage main content">
        <header className="sr-only">
          <h1>{t('hero.title')}</h1>
        </header>
        <section className="relative z-10 w-full flex flex-col items-center pointer-events-none" aria-labelledby="hero-title">
          <h1 id="hero-title" className="text-4xl md:text-5xl font-bold text-center mt-8 focus:outline focus:outline-2 focus:outline-primary">{t('hero.title')}</h1>
          <p className="text-lg md:text-xl text-center opacity-80 max-w-xl">{t('hero.subtitle')}</p>
        </section>
      </main>
    </ClientOnly>
  );
}