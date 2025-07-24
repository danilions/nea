import React from "react";
import { useTranslation } from "react-i18next";

export function SmartNarrativesSection() {
  const { t } = useTranslation();
  // Placeholder narratives
  const narratives = [
    t('narratives.sample_1', { defaultValue: 'Sample narrative about current events.' }),
    t('narratives.sample_2', { defaultValue: 'Another example narrative from live data.' }),
  ];

  return (
    <section className="w-full max-w-4xl mx-auto py-12 px-4" dir="auto">
      <h2 className="text-3xl font-bold text-center mb-2">{t('narratives.title')}</h2>
      <p className="text-lg text-gray-600 text-center mb-8">{t('narratives.description')}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {narratives.map((text, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow p-6 flex flex-col justify-between">
            <span className="text-gray-800 text-base mb-4">{text}</span>
            <button
              className="bg-primary text-white px-4 py-2 rounded font-medium shadow hover:bg-primary-dark transition self-end"
              disabled
            >
              {t('narratives.view_button', { defaultValue: 'View Details' })}
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded font-semibold shadow hover:bg-blue-700 transition"
          disabled
        >
          {t('narratives.generate_button', { defaultValue: 'Generate New Narrative' })}
        </button>
      </div>
    </section>
  );
}
