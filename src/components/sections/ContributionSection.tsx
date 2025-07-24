import React from "react";
import { useTranslation } from "react-i18next";

export function ContributionSection() {
  const { t } = useTranslation();
  return (
    <section className="w-full max-w-4xl mx-auto py-12 px-4" dir="auto">
      <h2 className="text-3xl font-bold text-center mb-2">{t('contribute.title')}</h2>
      <p className="text-lg text-gray-600 text-center mb-8">{t('contribute.description')}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Donate Card */}
        <div className="flex flex-col items-center bg-white rounded-lg shadow p-6">
          {/* Optional icon */}
          <span className="text-2xl mb-2" aria-hidden>💸</span>
          <span className="text-xl font-semibold mb-2">{t('contribute.donate_title', { defaultValue: 'Donate' })}</span>
          <p className="text-gray-700 text-center mb-4">{t('contribute.donate_text', { defaultValue: 'Support our mission with a donation.' })}</p>
          <button
            className="bg-yellow-500 text-white px-5 py-2 rounded font-medium shadow hover:bg-yellow-600 transition"
            disabled
          >
            {t('contribute.donate_button', { defaultValue: 'Donate Now' })}
          </button>
        </div>
        {/* Volunteer Card */}
        <div className="flex flex-col items-center bg-white rounded-lg shadow p-6">
          {/* Optional icon */}
          <span className="text-2xl mb-2" aria-hidden>🤝</span>
          <span className="text-xl font-semibold mb-2">{t('contribute.volunteer_title', { defaultValue: 'Volunteer' })}</span>
          <p className="text-gray-700 text-center mb-4">{t('contribute.volunteer_text', { defaultValue: 'Join our team and make a difference.' })}</p>
          <button
            className="bg-green-500 text-white px-5 py-2 rounded font-medium shadow hover:bg-green-600 transition"
            disabled
          >
            {t('contribute.volunteer_button', { defaultValue: 'Join Us' })}
          </button>
        </div>
      </div>
    </section>
  );
}
