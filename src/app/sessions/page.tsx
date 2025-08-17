'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Page } from '@/components/Page';
import { triggerHaptic } from '@/utils/haptics';

export default function AllSessions() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sessions, setSessions] = useState<{ id: number; name: string; fieldId?: number }[]>([]);
  const [fields, setFields] = useState<{ id: number; name: string }[]>([]);
  const [showNewSessionPopup, setShowNewSessionPopup] = useState(false);
  const [newSessionName, setNewSessionName] = useState('');
  const [selectedFieldId, setSelectedFieldId] = useState<number | undefined>(undefined);

  // Загружаем сессии и поля из localStorage
  useEffect(() => {
    const savedSessions = localStorage.getItem('sessions');
    if (savedSessions) setSessions(JSON.parse(savedSessions));

    const savedFields = localStorage.getItem('fields');
    if (savedFields) setFields(JSON.parse(savedFields));
  }, []);

  // Dark mode detection
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const addNewSession = () => {
    if (!newSessionName.trim()) return;
    const newSession = {
      id: sessions.length ? sessions[sessions.length - 1].id + 1 : 0,
      name: newSessionName.trim(),
      fieldId: selectedFieldId,
    };
    const updatedSessions = [...sessions, newSession];
    setSessions(updatedSessions);
    localStorage.setItem('sessions', JSON.stringify(updatedSessions));
    setNewSessionName('');
    setSelectedFieldId(undefined);
    setShowNewSessionPopup(false);
  };

  const getFieldName = (fieldId?: number) => fields.find(f => f.id === fieldId)?.name || 'No Field';

  console.log('Sessions:', sessions);

  return (
    <Page back={true}>
      <div className={`px-6 pt-32 min-h-screen sm:max-w-96 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-200'}`}>
        <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>All Sessions</h1>

      {/* Список сессий */}
      <div className="mt-6 space-y-6">
        {sessions
          .slice()
          .sort((a, b) => b.id - a.id) // новые сверху
          .map((session) => (
            <Link key={session.id} href={`/sessions/${session.id}`}>
              <div
                onClick={() => triggerHaptic('selection')}
                className={`
                  relative rounded-3xl p-4 mb-4 flex justify-between items-center
                  cursor-pointer transition-all shadow-lg overflow-hidden
                  ${isDarkMode ? 'bg-gray-800/30' : 'bg-white/20'}
                  backdrop-blur-xl border border-white/30 hover:bg-white/30
                `}
              >
                {/* Фоновый градиент для эффекта Liquid Glass */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/40 to-transparent opacity-30 pointer-events-none" />

                {/* Основной контент */}
                <div className="flex flex-col relative z-10">
                  <p className={`font-semibold text-lg ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    {session.name}
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {getFieldName(session.fieldId)}
                  </p>
                </div>

                {/* Дата или другая метка справа */}
                <span className={`absolute top-3 right-3 text-sm font-bold px-2 py-1 rounded-full  ${
                  isDarkMode ? ' text-gray-200' : ' text-gray-800'
                }`}>
                  {new Date().toLocaleDateString()}
                </span>
              </div>
            </Link>
          ))}
      </div>

      </div>
    </Page>
  );
}