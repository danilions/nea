import React from 'react';
import { useTranslation } from 'react-i18next';

export function ResponseToolSection() {
  const { t } = useTranslation('common');
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-blue-900 mb-4">{t('responseTool.title', 'Response Tool Section')}</h2>
    </section>
  );
}
