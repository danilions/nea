
'use client'
import WorldNetworkMap from '../WorldNetworkMap';
import { useTranslation } from 'react-i18next';

export default function HeroSection() {
  const { t } = useTranslation('home');
  return (
    <section className="relative w-full min-h-[600px] flex flex-col items-center justify-center py-16">
      {/* Mobile-only background */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover pointer-events-none block sm:hidden"
        style={{ backgroundImage: "url('/images/mobi.png')" }}
        aria-hidden="true"
      />
      {/* Desktop-only video background injected in page.tsx, not here */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center">
        <h1 className="text-6xl md:text-7xl font-extrabold text-center text-cyan-400 drop-shadow-lg mb-8 transition-all duration-300">
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
        <div className="mt-8 w-full flex items-center justify-center">
          <WorldNetworkMap />
        </div>
      </div>
    </section>
  );
}
