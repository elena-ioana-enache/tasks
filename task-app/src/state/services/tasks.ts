import { Task } from "./../../interfaces/Tasks";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type TasksResponse = Task[];

export const getTasksApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/" }),
  endpoints: (build) => ({
    getTasks: build.mutation<TasksResponse, void>({
      query: () => "tasks",
    }),
    updateTask: build.mutation<TasksResponse, { task: Task }>({
      query: ({ task }) => ({
        url: `tasks/${task.id}`,
        method: 'PUT',
        body: task,
      }),
    }),
    deleteTask: build.mutation<TasksResponse, { id: number }>({
      query: ({ id }) => ({
        url: `tasks/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});
// Export hooks for usage in functional components
export const { useUpdateTaskMutation, useDeleteTaskMutation, useGetTasksMutation } = getTasksApi;