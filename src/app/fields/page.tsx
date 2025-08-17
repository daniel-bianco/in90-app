'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Page } from '@/components/Page';

// Заглушка для функции haptic, замени на свою реализацию
const triggerHaptic = (type) => {
  if (navigator.vibrate) {
    navigator.vibrate(type === 'medium' ? 50 : 10);
  }
};

export default function Fields() {
  const t = useTranslations('i18n');
  const searchParams = useSearchParams();
  const fieldId = searchParams.get('fieldId');
  const name = searchParams.get('name');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);
    const handleChange = (e) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <Page back={true}>
      <div className={`px-6 pt-24 min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-200'} relative`}>
        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} mt-10`}>
          {name}
        </h1>

        {fieldId && name ? (
          <div>
            <p className={`mt-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>Field ID: {fieldId}</p>
            <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>Name: {name}</p>
          </div>
        ) : (
          <p className={`mt-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>Select a field to see details</p>
        )}

        <button
          onClick={() => triggerHaptic('medium')}
          className={`mt-6 ${isDarkMode ? 'bg-gray-700/80 text-gray-200' : 'bg-gray-200/80 text-gray-800'} px-4 py-2 rounded-full`}
        >
          Action
        </button>
      </div>
    </Page>
  );
}