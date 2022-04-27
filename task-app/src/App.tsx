import { CircularProgress, Grid } from '@mui/material';
import styles from './App.module.scss';
import TaskList from './components/TaskList/TaskList';
import { useGetTasksListQuery } from './state/services/tasks';

function App() {

  const { error, isLoading: isTaksListLoading } = useGetTasksListQuery();
  return (
    <div className={styles.container}>
      {error ? (
        <>Oh no, there was an error</>
      ) : isTaksListLoading ? (
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
