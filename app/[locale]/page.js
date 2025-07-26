// app/[locale]/page.js
"use client";

import { useTranslations } from 'next-intl';

export default function LocaleHome() {
  const t = useTranslations(); // load translations from common.json

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
        {t('welcome')}
      </h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
        {t('signup')} | {t('login')}
      </p>
      <p>🌍 This is the localized homepage for your marketplace!</p>
    </main>
  );
    }
