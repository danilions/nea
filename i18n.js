import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Synchronously import English resources for SSR/initial render
import enCommon from './public/common.json';
import enHome from './public/home.json';
import enAbout from './public/about.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: enCommon,
      home: enHome,
      about: enAbout
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
  i18n.addResourceBundle('he', 'common', res.common);
  i18n.addResourceBundle('he', 'home', res.home);
  i18n.addResourceBundle('he', 'about', res.about);
});


export default i18n;
