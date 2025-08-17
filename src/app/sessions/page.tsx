'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Page } from '@/components/Page';
import Link from 'next/link';

export default function AllSessions() {
  const t = useTranslations('i18n');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Мок-сессии
  const [sessions, setSessions] = useState([
    { id: 1, title: 'Work Session 1', field: 'Work', date: '2025-08-17' },
    { id: 2, title: 'English Session', field: 'English', date: '2025-08-18' },
    { id: 3, title: 'Korean Session', field: 'Korean', date: '2025-08-19' },
    { id: 4, title: 'Work Session 2', field: 'Work', date: '2025-08-20' },
  ]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <Page back={true}>
      <div
        className={`px-6 pt-32 min-h-screen sm:max-w-96 ${
          isDarkMode ? 'bg-gray-900' : 'bg-gray-200'
        }`}
      >
        <h1
          className={` text-4xl font-bold ${
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          }`}
        >
          All Sessions
        </h1>

        {/* Список сессий */}
        <div className="mt-6 space-y-4">
          {sessions.map((session) => (
            <Link key={session.id} href={`/sessions/${session.id}`}>
              <div
                className={`
                  p-4 mb-4 rounded-3xl flex justify-between items-center
                  shadow-lg 
                  ${isDarkMode ? 'bg-gray-800/50 shadow-gray-900/40' : 'bg-white/60 shadow-black/10'}
                  backdrop-blur-lg cursor-pointer
                `}
              >
                <div>
                  <p
                    className={`font-semibold text-lg ${
                      isDarkMode ? 'text-gray-100' : 'text-gray-900'
                    }`}
                  >
                    {session.title}
                  </p>
                  <p
                    className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {session.field}
                  </p>
                </div>
                <span
                  className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {session.date}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Кнопки снизу */}
        <div className="fixed bottom-0 left-0 right-0 px-6 py-4 backdrop-blur-sm flex justify-between">
          {/* Кнопка новой сессии */}
          <button
            className={`px-6 py-3 rounded-full shadow-lg transition-all duration-200
              ${isDarkMode ? 'bg-blue-600/90 text-white hover:bg-blue-700' : 'bg-white text-black border border-gray-300 hover:bg-gray-100'}
            `}
          >
            + New Session
          </button>

          {/* Кнопка добавления поля */}
          <button
            className={`px-6 py-3 rounded-full shadow-lg transition-all duration-200
              ${isDarkMode ? 'bg-gray-700/80 text-gray-200 hover:bg-gray-600' : 'bg-white text-black border border-gray-300 hover:bg-gray-100'}
            `}
          >
            + Field
          </button>
        </div>
      </div>
    </Page>
  );
}