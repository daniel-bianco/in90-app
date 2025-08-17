'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Page } from '@/components/Page';
import { triggerHaptic } from '@/utils/haptics';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fields, setFields] = useState<{ id: number; name: string }[]>([]);
  const [sessions, setSessions] = useState<{ id: number; name: string; fieldId?: number }[]>([]);
  const [showNewFieldPopup, setShowNewFieldPopup] = useState(false);
  const [newFieldName, setNewFieldName] = useState('');
  const [showNewSessionPopup, setShowNewSessionPopup] = useState(false);
  const [newSessionName, setNewSessionName] = useState('');
  const [selectedFieldId, setSelectedFieldId] = useState<number | undefined>(undefined);

  useEffect(() => {
    const savedFields = localStorage.getItem('fields');
    if (savedFields) setFields(JSON.parse(savedFields));
    else {
      const initialFields = [
        { id: 0, name: 'Work' },
        { id: 1, name: 'English' },
        { id: 2, name: 'Korean' },
      ];
      setFields(initialFields);
      localStorage.setItem('fields', JSON.stringify(initialFields));
    }

    const savedSessions = localStorage.getItem('sessions');
    if (savedSessions) setSessions(JSON.parse(savedSessions));
    else setSessions([]);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const addNewField = () => {
    if (!newFieldName.trim()) return;
    const newField = {
      id: fields.length ? fields[fields.length - 1].id + 1 : 0,
      name: newFieldName.trim(),
    };
    const updatedFields = [...fields, newField];
    setFields(updatedFields);
    localStorage.setItem('fields', JSON.stringify(updatedFields));
    setNewFieldName('');
    setShowNewFieldPopup(false);
  };

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

  return (
    <Page back={false}>
      <div className={`px-6 min-h-screen relative sm:max-w-96 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-200'}`}>
        <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-200'} fixed top-0 left-0 w-full h-safe-top z-50`} />

        <p className={`pt-32 text-5xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} drop-shadow-md`}>in90</p>

        <div className="links-list mt-6">
          {['All', 'Scheduled', 'Completed'].map((item) => (
            <Link key={item} href="/sessions">
              <div
                onClick={() => triggerHaptic('selection')}
                className={`
                  relative flex justify-between items-center
                  rounded-full py-3 px-6 mb-3 cursor-pointer overflow-hidden
                  shadow-lg transition-all
                  ${isDarkMode ? 'bg-gray-800/30' : 'bg-white/20'}
                  backdrop-blur-xl border border-white/30 hover:bg-white/30
                `}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 to-transparent opacity-30 pointer-events-none" />
                <p className={`relative z-10 font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{item}</p>
                <span className={`relative z-10 text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-700/70'}`}>
                  {item === 'All' ? sessions.length : 0} &gt;
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6">
          <p className={`text-lg font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} mb-4`}>All Fields</p>
          <div className="grid grid-cols-2 gap-4">
            {fields.map((field) => {
              const count = sessions.filter(s => s.fieldId === field.id).length;
              return (
                <Link
                  href={`/fields/${field.id}`}
                  key={field.id}
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
                    <span
                      className={`absolute top-3 right-3 text-sm font-bold px-2 py-1 rounded-full backdrop-blur-md ${
                        isDarkMode ? 'bg-gray-700/40 text-gray-200' : 'bg-white/50 text-gray-800'
                      }`}
                    >
                      {count}
                    </span>
                    <div className="flex flex-col items-start relative z-10">
                      <span className="text-3xl">📂</span>
                      <p className={`mt-2 font-semibold text-left ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{field.name}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-8 mb-9 flex justify-between fixed bottom-0 left-0 right-0 px-6 py-4 backdrop-blur-sm">
          <button
            onClick={() => setShowNewSessionPopup(true)}
            className="flex items-center bg-blue-600/90 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200"
          >
            <span className="mr-2 text-xl">+</span> New Session
          </button>
          <button
            onClick={() => setShowNewFieldPopup(true)}
            className={`flex items-center ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} px-6 py-3 transition-all duration-200`}
          >
            Add Field
          </button>
        </div>

        {showNewFieldPopup && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className={`bg-${isDarkMode ? 'gray-800/70' : 'white/70'} backdrop-blur-xl rounded-2xl p-6 w-80 flex flex-col gap-4`}>
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>New Field</h2>
              <input
                type="text"
                value={newFieldName}
                onChange={(e) => setNewFieldName(e.target.value)}
                placeholder="Field Name"
                className={`p-2 rounded-lg border ${isDarkMode ? 'border-gray-600 bg-gray-700/50 text-gray-100' : 'border-gray-300 bg-white/50 text-gray-900'}`}
              />
              <div className="flex justify-end gap-3 mt-2">
                <button
                  onClick={() => setShowNewFieldPopup(false)}
                  className={`px-4 py-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-200 text-gray-900'} transition-all`}
                >
                  Cancel
                </button>
                <button onClick={addNewField} className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all">
                  Create
                </button>
              </div>
            </div>
          </div>
        )}

        {showNewSessionPopup && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className={`bg-${isDarkMode ? 'gray-800/70' : 'white/70'} backdrop-blur-xl rounded-2xl p-6 w-80 flex flex-col gap-4`}>
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>New Session</h2>
              <input
                type="text"
                value={newSessionName}
                onChange={(e) => setNewSessionName(e.target.value)}
                placeholder="Session Name"
                className={`p-2 rounded-lg border ${isDarkMode ? 'border-gray-600 bg-gray-700/50 text-gray-100' : 'border-gray-300 bg-white/50 text-gray-900'}`}
              />
              <select
                value={selectedFieldId}
                onChange={(e) => setSelectedFieldId(Number(e.target.value))}
                className={`p-2 rounded-lg border ${isDarkMode ? 'border-gray-600 bg-gray-700/50 text-gray-100' : 'border-gray-300 bg-white/50 text-gray-900'}`}
              >
                <option value={undefined}>No field</option>
                {fields.map(f => (
                  <option key={f.id} value={f.id}>{f.name}</option>
                ))}
              </select>
              <div className="flex justify-end gap-3 mt-2">
                <button
                  onClick={() => setShowNewSessionPopup(false)}
                  className={`px-4 py-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-200 text-gray-900'} transition-all`}
                >
                  Cancel
                </button>
                <button onClick={addNewSession} className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all">
                  Create
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </Page>
  );
}