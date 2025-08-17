import { useState, useEffect } from 'react';

export interface Task {
  id: number;
  name: string;
  completed: boolean;
  duration: number;
}

export interface Session {
  id: number;
  name: string;
  fieldId?: number;
  tasks: Task[];
}

export interface Field {
  id: number;
  name: string;
}

export function useSessions() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [fields, setFields] = useState<Field[]>([]);

  useEffect(() => {
    const savedSessions = localStorage.getItem('sessions');
    const savedFields = localStorage.getItem('fields');

    setSessions(savedSessions ? JSON.parse(savedSessions) : []);
    setFields(savedFields ? JSON.parse(savedFields) : []);
  }, []);

  const addSession = (session: Session) => {
    const updated = [...sessions, session];
    setSessions(updated);
    localStorage.setItem('sessions', JSON.stringify(updated));
  };

  const addField = (field: Field) => {
    const updated = [...fields, field];
    setFields(updated);
    localStorage.setItem('fields', JSON.stringify(updated));
  };

  return { sessions, fields, addSession, addField };
}