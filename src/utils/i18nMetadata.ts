// src/utils/i18nMetadata.ts

// Async helper: fetches metadata from public/locales/{lang}/common.json
export async function getStaticI18nMetadata(lang: 'en' | 'he' = 'en') {
  const baseUrl = typeof window === 'undefined'
    ? process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    : '';
  const res = await fetch(`${baseUrl}/locales/${lang}/common.json`);
  const dict = await res.json();
  const meta = dict.metadata || {};
  return {
    title: meta.title || '',
    description: meta.description || '',
    keywords: meta.keywords || [],
    metadataBase: new URL('https://www.lionsofzion.com'),
    openGraph: {
      title: meta.title || '',
      description: meta.description || '',
      url: `https://www.lionsofzion.com/${lang}`,
    }
  };
}
