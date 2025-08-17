'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Page } from '@/components/Page';
import { triggerHaptic } from '@/utils/haptics';

export default function FieldPage() {
  const params = useParams();
  const fieldIdNum = Number(params.id); // id из url
  const [fields, setFields] = useState<{ id: number; name: string }[]>([]);
  const [sessions, setSessions] = useState<{ id: number; name: string; fieldId?: number }[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedFields = localStorage.getItem('fields');
    if (savedFields) setFields(JSON.parse(savedFields));

    const savedSessions = localStorage.getItem('sessions');
    if (savedSessions) setSessions(JSON.parse(savedSessions));
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const field = fields.find(f => f.id === fieldIdNum);
  const filteredSessions = sessions.filter(s => s.fieldId === fieldIdNum);

  if (!field) return <Page back>Field not found</Page>;

  return (
    <Page back>
      <div className={`px-6 min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg'}`}>
        <h1 className={`text-3xl font-bold mt-12 mb-6 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{field.name}</h1>

        {filteredSessions.length === 0 ? (
          <p className={`${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>No sessions in this field yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filteredSessions.map(session => (
              <Link
                key={session.id}
                href={`/sessions/${session.id}`}
              >
                <div
                  onClick={() => triggerHaptic('selection')}
                  className={`
                    relative rounded-3xl p-4 flex flex-col justify-between
                    cursor-pointer transition-all shadow-lg overflow-hidden
                    ${isDarkMode ? 'bg-gray-800/30' : 'bg-white/20'}
                    backdrop-blur-xl border border-white/30 hover:bg-white/30
                  `}
                >
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/40 to-transparent opacity-30 pointer-events-none" />
                  <div className="flex flex-col items-start relative z-10">
                    <span className="text-3xl">📝</span>
                    <p className={`mt-2 font-semibold text-left ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      {session.name}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Page>
  );
}