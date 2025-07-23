import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import { WatchlistPanel } from '@/components/watchlist/WatchlistPanel';
import HeroSection from '@/components/sections/HeroSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { TrustIndicators } from '@/components/sections/TrustIndicators';
import { ContactSection } from '@/components/sections/ContactSection';
import Image from 'next/image';

const GalacticGlobeApp = dynamic(() => import('@/components/globe/GalacticGlobeApp'), { ssr: false });

export default function Home() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <Header />
      <HeroSection /> {/* With WorldNetworkMap + DigitalLion */}
      {/* Inject logo.png visually in header using Next.js Image */}
      <div className="flex justify-center items-center py-2">
        <Image src="/logo.png" alt={t('common.logoAlt')} width={64} height={64} />
      </div>
      {/* Inject mobi.png as a decorative background in HeroSection */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-40 pointer-events-none" style={{backgroundImage: "url('/mobi.png')", backgroundSize: 'cover'}} aria-hidden="true" />
      <FeaturesSection />
      <TrustIndicators /> {/* Using MetricsDisplay */}
      {/* Inject background.mp4 as a muted video background */}
      <video autoPlay loop muted playsInline className="fixed inset-0 w-full h-full object-cover -z-20" aria-hidden="true">
        <source src="/background.mp4" type="video/mp4" />
      </video>
      <section className="section relative">
        <div className="container grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <h2 className="heading-2 mb-8">{t('globe.mainTitle')}</h2>
            <GalacticGlobeApp />
          </div>
          <div className="lg:col-span-1">
            <WatchlistPanel items={[]} onRemove={() => {}} />
          </div>
        </div>
      </section>
      {/* Inject about.json and home.json i18n keys into matching sections */}
      <section className="section">
        <h2 className="heading-2">{t('about.title')}</h2>
        <p>{t('about.description')}</p>
      </section>
      <section className="section">
        <h2 className="heading-2">{t('home.title')}</h2>
        <p>{t('home.description')}</p>
      </section>
      <ContactSection />
    </div>
  );
}
