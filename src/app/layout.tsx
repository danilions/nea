        {/* Dev diagnostics overlay (hidden in production) */}
        {process.env.NODE_ENV !== 'production' && (
          <div className="fixed top-0 right-0 z-50 bg-red-900 text-white px-4 py-2 text-xs font-bold shadow-lg pointer-events-auto">
            Dev Diagnostics: 5 Issues
          </div>
        )}

import './global.css';
import { Footer } from '@/components/sections/Footer';
import React from 'react';
import I18nProvider from './i18n-provider';

import ClientLayoutShell from '@/components/ClientLayoutShell';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="bg-black min-h-screen w-full overflow-hidden">
        <ClientLayoutShell>
          <I18nProvider>
            {children}
          </I18nProvider>
          {/* Footer מוצג בכל עמוד */}
          <Footer />
        </ClientLayoutShell>
      </body>
    </html>
  );
}
