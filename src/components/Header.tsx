"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { t } = useTranslation();
  const [isGlobeActive] = useState(false); // דוגמה בלבד
  // אפשר לחבר ל-state אמיתי של הגלוב
  return (
    <motion.header
      className="w-full py-6 bg-gray-900 text-white text-center shadow"
      role="banner"
      aria-label={t('header.ariaLabel')}
      animate={{ opacity: isGlobeActive ? 0.5 : 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold">{t('header.title')}</h1>
    </motion.header>
  );
}
