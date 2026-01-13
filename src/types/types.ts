export type Status = "Open" | "In Progress" | "Closed";
export type Priority = "Low" | "Medium" | "High";

export interface Issue {
  id: string;
  title: string;
  body: string;
  status: Status;
  priority: Priority;
  createdAt: string;
  isLocal?: boolean;
}
