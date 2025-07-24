import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Synchronously import English resources for SSR/initial render
import enCommon from './public/locales/en/common.json';
import enHome from './public/locales/en/home.json';
import enAbout from './public/locales/en/about.json';
import heCommon from './public/locales/he/common.json';
import heHome from './public/locales/he/home.json';
import heAbout from './public/locales/he/about.json';
import arCommon from './public/locales/ar/common.json';
import arHome from './public/locales/ar/home.json';
// about.json for ar can be added if exists

// Add all languages to resources
i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: enCommon,
      home: enHome,
      about: enAbout
    },
    he: {
      common: heCommon,
      home: heHome,
      about: heAbout
    },
    ar: {
      common: arCommon,
      home: arHome
      // about: arAbout (add if exists)
    }
  },
  lng: 'en',
  fallbackLng: 'en',
  ns: ['common', 'home', 'about'],
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
});

// You can keep async loading for other languages if needed
// Dynamic loading of i18n resources from public/locales using fetch
async function loadLocale(lang = 'he') {
  const namespaces = ['common', 'home', 'about'];
  const resources = {};
  for (const ns of namespaces) {
    try {
      const res = await fetch(`/locales/${lang}/${ns}.json`);
      resources[ns] = await res.json();
    } catch {
      resources[ns] = {};
    }
  }
  return resources;
}


loadLocale('he').then((res) => {
  if (!res.common || typeof res.common !== 'object') {
    console.warn('[i18n] Missing or invalid namespace: he/common.json');
  } else {
    i18n.addResourceBundle('he', 'common', res.common);
  }
  if (!res.home || typeof res.home !== 'object') {
    console.warn('[i18n] Missing or invalid namespace: he/home.json');
  } else {
    i18n.addResourceBundle('he', 'home', res.home);
  }
  if (!res.about || typeof res.about !== 'object') {
    console.warn('[i18n] Missing or invalid namespace: he/about.json');
  } else {
    i18n.addResourceBundle('he', 'about', res.about);
  }
});


export default i18n;
