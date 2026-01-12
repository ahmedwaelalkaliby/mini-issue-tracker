export type Status = 'open' | 'in progress' | 'closed';
export type Priority = 'low' | 'medium' | 'high';

export interface Issue {
  id: number;
  title: string;
  body: string;
}