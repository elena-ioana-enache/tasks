export type TaskStatus = "done" | "toDo" | "doing";
export interface Task {
  name?: string;
  description: string;
  date: string;
  status: TaskStatus;
}
