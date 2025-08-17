export type Task = {
  id: number;
  name: string;
  done: boolean;
  duration?: number; // в минутах, можно использовать позже
};