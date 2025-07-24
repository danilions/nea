import React from "react";
import { useTranslation } from "react-i18next";

export function DigitalLionSection() {
  const { t } = useTranslation();
  return (
    <section className="w-full max-w-2xl mx-auto py-16 px-4 flex flex-col items-center bg-white rounded-lg shadow-md gap-y-12">
      <h2 className="text-3xl font-bold text-center mb-2">{t('digital_lion.title')}</h2>
      <p className="text-lg text-blue-200 text-center mb-6">{t('digital_lion.description')}</p>
      <div className="w-full flex flex-col sm:flex-row gap-2 items-center justify-center mt-4">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder={t('digital_lion.input_placeholder', { defaultValue: 'Type your question...' })}
          disabled
        />
        <button
          className="bg-primary text-white px-6 py-2 rounded font-semibold shadow hover:bg-primary-dark transition"
          disabled
        >
          {t('digital_lion.send_button', { defaultValue: 'Send' })}
        </button>
      </div>
      <div className="w-full mt-8 min-h-[80px] bg-gray-900 rounded p-4 text-blue-200 text-center">
        {/* Response area placeholder */}
        {t('digital_lion.response_placeholder', { defaultValue: 'Response will appear here.' })}
      </div>
    </section>
  );
}
