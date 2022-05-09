import { Task } from "./../../interfaces/Tasks";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type TasksResponse = Task[];

export const getTasksApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://tasks-fe677-default-rtdb.europe-west1.firebasedatabase.app/" }),
  endpoints: (build) => ({
    getTasks: build.mutation<TasksResponse, void>({
      query: () => "tasks.json",
    }),
    updateTask: build.mutation<TasksResponse, { task: Task, id: string }>({
      query: ({ task, id }) => ({
        url: `tasks/${id}.json`,
        method: 'PUT',
        body: task,
      }),
    }),
    deleteTask: build.mutation<TasksResponse, { id: string }>({
      query: ({ id }) => ({
        url: `tasks/${id}.json`,
        method: 'DELETE',
      }),
    }),
  }),
});
// Export hooks for usage in functional components
export const { useUpdateTaskMutation, useDeleteTaskMutation, useGetTasksMutation } = getTasksApi;