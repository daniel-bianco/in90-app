import { Task } from './task';
import { Field } from './field';

export type Session = {
  id: number;
  name: string;
  fieldId?: number;       // опционально
  tasks: Task[];          // до 5 задач
  status: 'active' | 'completed';
  createdAt: string;
  completedAt?: string;
};