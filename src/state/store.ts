import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { getTasksApi } from "./services/tasks";
import taskReducer from "./services/task.reducer";

export const store = configureStore({
  reducer: combineReducers({
    taskReducer,
    [getTasksApi.reducerPath]: getTasksApi.reducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(getTasksApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
  //preloadedState: rootInitialState,
});
setupListeners(store.dispatch);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
