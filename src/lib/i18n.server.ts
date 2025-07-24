import i18n from 'i18next';
import Backend from 'i18next-fs-backend';
import { initReactI18next } from 'react-i18next';
import path from 'path';
import fs from 'fs';

const localesPath = path.join(process.cwd(), 'public/locales');
const preloadLanguages = ['en', 'he'];
const preloadNamespaces = ['home'];

const resources: { [lng: string]: { [ns: string]: any } } = {};
preloadLanguages.forEach(lng => {
  resources[lng] = {};
  preloadNamespaces.forEach(ns => {
    const filePath = path.join(localesPath, lng, `${ns}.json`);
    try {
      resources[lng][ns] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch {
      resources[lng][ns] = {};
    }
  });
});

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    preload: preloadLanguages,
    ns: preloadNamespaces,
    resources,
    backend: {
      loadPath: path.join(localesPath, '{{lng}}/{{ns}}.json'),
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
