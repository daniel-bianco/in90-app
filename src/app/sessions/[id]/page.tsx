'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Page } from '@/components/Page';
import { triggerHaptic } from '@/utils/haptics';

interface Session {
  id: number;
  name: string;
  fieldId?: number;
  notes?: string;
}

interface Field {
  id: number;
  name: string;
}

export default function SessionPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = Number(params.id);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [field, setField] = useState<Field | null>(null);

  // Dark mode detection
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Загрузка сессии из localStorage
  useEffect(() => {
    const savedSessions = localStorage.getItem('sessions');
    const savedFields = localStorage.getItem('fields');

    if (savedSessions) {
      const sessions: Session[] = JSON.parse(savedSessions);
      const found = sessions.find(s => s.id === sessionId);
      if (found) setSession(found);
      else router.replace('/sessions'); // если не нашли – редирект на список
    }

    if (savedFields) {
      const fields: Field[] = JSON.parse(savedFields);
      if (session?.fieldId !== undefined) {
        const foundField = fields.find(f => f.id === session.fieldId);
        if (foundField) setField(foundField);
      }
    }
  }, [sessionId, session?.fieldId, router]);

  if (!session) return <Page back={true}><p>Loading...</p></Page>;

  return (
    <Page back={true}>
      <div className={`px-6 pt-32 min-h-screen sm:max-w-96 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-200'}`}>
        <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          {session.name}
        </h1>

        <div className="mt-6 p-4 rounded-3xl shadow-lg backdrop-blur-lg 
          flex flex-col gap-4
          justify-start
          bg-white/60 shadow-black/10
          dark:bg-gray-800/50 dark:shadow-gray-900/40
        ">
          <p className={`text-lg ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            <strong>Field:</strong> {field?.name || 'No Field'}
          </p>

          <p className={`text-lg ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            <strong>Notes:</strong> {session.notes || 'No notes yet'}
          </p>
        </div>

        {/* Кнопка редактирования (опционально) */}
        <div className="mt-6">
          <button
            onClick={() => triggerHaptic('selection')}
            className={`px-6 py-3 rounded-full shadow-lg transition-all duration-200
              ${isDarkMode ? 'bg-blue-600/90 text-white hover:bg-blue-700' : 'bg-white text-black border border-gray-300 hover:bg-gray-100'}
            `}
          >
            Edit Session
          </button>
        </div>
      </div>
    </Page>
  );
}