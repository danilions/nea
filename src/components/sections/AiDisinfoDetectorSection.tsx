import React from "react";
import { useTranslation } from "react-i18next";

export function AiDisinfoDetectorSection() {
  const { t } = useTranslation();
  return (
    <section className="w-full max-w-7xl mx-auto py-16 px-4 flex flex-col items-center gap-y-12" dir="auto">
      <h2 className="text-3xl font-bold text-center mb-2">{t('disinfoDetector.title')}</h2>
      <p className="text-lg text-blue-200 text-center mb-8">{t('disinfoDetector.description')}</p>
      <div className="w-full flex justify-center">
        <div className="bg-gray-900 rounded-lg min-h-[200px] w-full max-w-3xl flex items-center justify-center text-blue-200 text-lg">
          AI Output Placeholder
        </div>
      </div>
    </section>
  );
}
