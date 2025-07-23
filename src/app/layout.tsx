
import './global.css';
import { Footer } from '@/components/sections/Footer';
import I18nProvider from './i18n-provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <I18nProvider>
          {children}
        </I18nProvider>
        {/* Footer מוצג בכל עמוד */}
        <Footer />
      </body>
    </html>
  );
}
