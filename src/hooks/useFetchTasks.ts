import { useFetch } from './../state/services/task.selector';
import { useCallback, useEffect } from "react";
import { setFetch, setTasksAction } from "../state/services/task.reducer";
import { useGetTasksMutation } from "../state/services/tasks";
import { useAppDispatch } from "./redux.hook";

export const useFetchTasks = (): { isTaskListLoading: boolean, isError: any } => {
  const dispatch = useAppDispatch();
  const [getTasks, { isLoading, error }] = useGetTasksMutation();
  const fetch = useFetch();

  const fillState = useCallback(async () => {
    const response = await getTasks();
    if ('data' in response) {
      dispatch(setTasksAction(response.data));
    }
  }, [getTasks, dispatch]);

  useEffect(() => {
    if (fetch) {
      fillState();
    }
    dispatch(setFetch(false));
  }, [fillState, dispatch, fetch]);
  return ({
    isTaskListLoading: isLoading,
    isError: error,
  });
}