import React from 'react';
import { useTranslation } from 'react-i18next';

export function ProjectTimelineSection() {
  const { t } = useTranslation('common');
  return (
    <section className="py-16 gap-y-12">
      <h2 className="text-2xl font-bold text-blue-200 mb-6">{t('project_timeline.title', 'Project Timeline')}</h2>
      <ul className="border-l-2 border-blue-300 pl-6 space-y-6">
        <li className="relative">
          <span className="absolute -left-3 top-1 w-3 h-3 bg-blue-500 rounded-full"></span>
          <span className="font-semibold text-blue-700">{t('project_started')}</span>
        </li>
        <li className="relative">
          <span className="absolute -left-3 top-1 w-3 h-3 bg-blue-500 rounded-full"></span>
          <span className="font-semibold text-blue-700">{t('major_upgrade')}</span>
        </li>
        <li className="relative">
          <span className="absolute -left-3 top-1 w-3 h-3 bg-blue-500 rounded-full"></span>
          <span className="font-semibold text-blue-700">{t('first_live_update')}</span>
        </li>
      </ul>
    </section>
  );
}
