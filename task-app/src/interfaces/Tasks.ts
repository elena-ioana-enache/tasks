export type TaskStatus = "done" | "toDo" | "doing";
export interface Task {
  id: number;
  name: string;
  description: string;
  date: string;
  status: TaskStatus;
}
