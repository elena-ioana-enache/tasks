import { Task } from "./../../interfaces/Tasks";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TaskInterface {
  tasks: Task[] | null;
  fetch: boolean;
  newTask: Task | null;
}
export const taskInitialState: TaskInterface = {
  tasks: null,
  fetch: true,
  newTask: null,
};
const taskReducer = createSlice({
  name: "TASK",
  initialState: taskInitialState,
  reducers: {
    setTasksAction(state: TaskInterface, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },
    setFetch(state: TaskInterface, action: PayloadAction<boolean>) {
      state.fetch = action.payload;
    },
    setNewTask(state: TaskInterface, action: PayloadAction<Task | null>) {
      state.newTask = action.payload
    }
  },

});

export const { setTasksAction, setFetch, setNewTask } = taskReducer.actions;

export default taskReducer.reducer;
