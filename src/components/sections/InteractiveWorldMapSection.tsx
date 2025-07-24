import React from 'react';
import { useTranslation } from 'react-i18next';
import InteractiveWorldMap from '@/components/sections/InteractiveWorldMap';

export function InteractiveWorldMapSection() {
  const { t } = useTranslation('common');
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-blue-900 mb-4">{t('features.globalNetwork')}</h2>
      <InteractiveWorldMap />
    </section>
  );
}
