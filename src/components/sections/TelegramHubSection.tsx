import React from "react";
import { useTranslation } from "react-i18next";

export function TelegramHubSection() {
  const { t } = useTranslation();
  // Example group keys, can be extended
  const groups = [
    {
      key: "group_lions",
      link: "#",
    },
    {
      key: "group_news",
      link: "#",
    },
  ];

  return (
    <section className="w-full max-w-4xl mx-auto py-16 px-4 gap-y-12">
      <h2 className="text-3xl font-bold text-center mb-2">{t('telegram_hub.title')}</h2>
      <p className="text-lg text-blue-200 text-center mb-8">{t('telegram_hub.description')}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {groups.map((group) => (
          <div key={group.key} className="flex flex-col items-center bg-white rounded-lg shadow p-6">
            <span className="text-xl font-semibold mb-4">{t(`telegram_hub.${group.key}`)}</span>
            <button
              className="bg-blue-500 text-white px-5 py-2 rounded font-medium shadow hover:bg-blue-600 transition"
              disabled
            >
              {t('telegram_hub.join_button', { defaultValue: 'Join' })}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
