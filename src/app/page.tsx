
"use client";
import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import HeroSection from '@/components/sections/HeroSection';
import { ContactSection } from '@/components/sections/ContactSection';
import GalacticGlobeApp from '@/components/globe/GlobeClientLoader';

export default function Home() {
  const { t } = useTranslation();
  console.log('Render: Home (page.tsx)');
  const [diagnostic, setDiagnostic] = React.useState('');
  const [runtime, setRuntime] = React.useState('');
  React.useEffect(() => {
    setDiagnostic(`DIAGNOSTIC: ${new Date().toISOString()}`);
    setRuntime(`RUNTIME: ${new Date().toISOString()}`);
  }, []);
  return (
    <>
      <div id="diagnostic-marker" style={{textAlign: 'center', color: '#c00', fontWeight: 'bold', margin: '8px 0'}}>
        {diagnostic}
      </div>
      {/* Header always visible */}
      {console.log('Render: Header')}
      <Header />
      {/* Hero section with globe and slogan */}
      {console.log('Render: HeroSection')}
      <HeroSection />
      <div id="render-verify" style={{textAlign: 'center', color: '#0a0', fontWeight: 'bold', margin: '8px 0'}}>
        {runtime}
      </div>
      {/* Main interactive globe */}
      {console.log('Render: GalacticGlobeApp')}
      <GalacticGlobeApp />
      {/* Features grid */}
      <section className="section">
        <h2 className="heading-2">{t('about.title')}</h2>
        <p>{t('about.description')}</p>
      </section>
      {/* Home section (i18n) */}
      {console.log('Render: HomeSection')}
      <section className="section">
        <h2 className="heading-2">{t('home.title')}</h2>
        <p>{t('home.description')}</p>
      </section>
      {/* Contact section */}
      {console.log('Render: ContactSection')}
      <ContactSection />
    </>
  );
}
