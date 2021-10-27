import { Task } from "./../../interfaces/Tasks";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type TasksResponse = Task[];

export const getTasksApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/" }),
  endpoints: (build) => ({
    getTasksList: build.query<TasksResponse, void>({
      query: () => "tasks",
    }),
  }),
});
// Export hooks for usage in functional components
export const { useGetTasksListQuery } = getTasksApi;