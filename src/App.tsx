import { CircularProgress, Grid } from '@mui/material';
import styles from './App.module.scss';
import TaskList from './components/TaskList/TaskList';
import { useFetchTasks } from './hooks/useFetchTasks';


function App() {

  const { isTaskListLoading, isError } = useFetchTasks();

  return (
    <div className={styles.container}>
      {isError ? (
        <>Oh no, there was an error</>
      ) : isTaskListLoading ? (
        <Grid container>
          <Grid item xs={12} p={30}>
            <CircularProgress color="primary" size="13rem" />
          </Grid>
        </Grid>
      ) : <TaskList />}
    </div>
  );
}

export default App;
