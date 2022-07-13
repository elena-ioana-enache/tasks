import { useAppSelector } from "../../hooks/redux.hook";
import { Task } from "../../interfaces/Tasks";
import { shallowEqual } from 'react-redux';

export const useTasks = (): Task[] =>
  useAppSelector(state => state.taskReducer.tasks, shallowEqual);

export const useFetch = (): boolean =>
  useAppSelector(state => state.taskReducer.fetch, shallowEqual);
export const useNewTask = (): Task | null =>
  useAppSelector(state => state.taskReducer.newTask, shallowEqual);
