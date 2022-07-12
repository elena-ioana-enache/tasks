export type TaskStatus = "done" | "toDo" | "doing";
export interface Task {
  id: string;
  name: string;
  description: string;
  date: string;
  status: TaskStatus;
}
