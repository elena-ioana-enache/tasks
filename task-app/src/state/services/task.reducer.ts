import { Task } from "./../../interfaces/Tasks";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTasksApi } from "./tasks";

export interface TaskInterface {
  tasks: Task[] | null;
}
export const taskInitialState: TaskInterface = {
  tasks: null,
};
const taskReducer = createSlice({
  name: "TASK",
  initialState: taskInitialState,
  reducers: {
    setTasksAction(state: TaskInterface, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      getTasksApi.endpoints.getTasksList.matchFulfilled,
      (state, action) => {
        state.tasks = action.payload;
      }
    );
  },
});

export const { setTasksAction } = taskReducer.actions;

export default taskReducer.reducer;
