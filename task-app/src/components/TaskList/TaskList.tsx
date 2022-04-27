import { Grid, Typography } from '@mui/material';
import { useGetTasksListQuery } from '../../state/services/tasks';
import TaskWidget from '../TaskWidget/TaskWidget';
import styles from './TaskList.module.scss';

const TaskList = () => {
  const { data } = useGetTasksListQuery();

  return (
    <div className={styles.container}>
      <Typography variant='h4'>Tasks List</Typography>
      <Grid container spacing={0.3}>
        {
          data ? data.map(task =>
            <Grid item xs={2} key={task.id}>
              <TaskWidget task={task} key={task.id} />
            </Grid>
          ) : null}
      </Grid>
    </div>
  )
}
export default TaskList;
