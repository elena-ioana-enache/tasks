import { Task } from "./../../interfaces/Tasks";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TaskInterface {
  tasks: Task[] | null;
  fetch: boolean;
}
export const taskInitialState: TaskInterface = {
  tasks: null,
  fetch: true,
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
  },

});

export const { setTasksAction, setFetch } = taskReducer.actions;

export default taskReducer.reducer;
