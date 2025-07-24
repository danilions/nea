import React from "react";
import { useTranslation } from "react-i18next";

export function WhatsAppCommunitySection() {
  const { t } = useTranslation();
  // Example communities, can be extended
  const communities = [
    {
      name: t('whatsapp_community.community_lions', { defaultValue: 'Lions Task Force' }),
      link: "#",
    },
    {
      name: t('whatsapp_community.community_news', { defaultValue: 'News Watchers' }),
      link: "#",
    },
  ];

  return (
    <section className="w-full max-w-4xl mx-auto py-12 px-4" dir="auto">
      <h2 className="text-3xl font-bold text-center mb-2">{t('whatsapp_community.title')}</h2>
      <p className="text-lg text-gray-600 text-center mb-8">{t('whatsapp_community.description')}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {communities.map((community, idx) => (
          <div key={idx} className="flex flex-col items-center bg-white rounded-lg shadow p-6">
            <span className="text-xl font-semibold mb-4">{community.name}</span>
            <button
              className="bg-green-500 text-white px-5 py-2 rounded font-medium shadow hover:bg-green-600 transition"
              disabled
            >
              {t('whatsapp_community.join_button', { defaultValue: 'Join' })}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
