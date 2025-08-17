import { Session } from '@/types/session';
import { Field } from '@/types/field';

export const getSessions = (): Session[] => {
  return JSON.parse(localStorage.getItem('sessions') || '[]');
};

export const saveSessions = (sessions: Session[]) => {
  localStorage.setItem('sessions', JSON.stringify(sessions));
};

export const getFields = (): Field[] => {
  return JSON.parse(localStorage.getItem('fields') || '[]');
};

export const saveFields = (fields: Field[]) => {
  localStorage.setItem('fields', JSON.stringify(fields));
};