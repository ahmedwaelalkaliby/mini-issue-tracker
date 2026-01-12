export type Status = 'Open' | 'In Progress' | 'Closed';
export type Priority = 'Low' | 'Medium' | 'High';

export interface Issue {
  id: string | number; 
  title: string;
  body: string;
  status: Status;
  priority: Priority;
  createdAt: string;
  isLocal?: boolean;
}

