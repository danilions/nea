import React from "react";
import { useTranslation } from "react-i18next";
import InfluenceMap from "@/components/InfluenceMap";

export function InfluenceMapSection() {
  const { t } = useTranslation();
  return (
    <section className="w-full max-w-7xl mx-auto py-16 px-4 flex flex-col items-center" dir="auto">
      <h2 className="text-3xl font-bold text-center mb-2">{t('influenceMap.title')}</h2>
      <p className="text-lg text-gray-600 text-center mb-8">{t('influenceMap.description')}</p>
      <div className="w-full flex justify-center">
        <div className="w-full max-w-5xl">
          <InfluenceMap />
        </div>
      </div>
    </section>
  );
}
