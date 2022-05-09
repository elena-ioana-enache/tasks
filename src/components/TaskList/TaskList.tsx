import { Grid, Typography } from '@mui/material';
import { useTasks } from '../../state/services/task.selector';
import TaskWidget from '../TaskWidget/TaskWidget';
import styles from './TaskList.module.scss';

const TaskList = () => {
  const data = useTasks();

  return (
    <div className={styles.container}>
      <Typography variant='h4'>Tasks List</Typography>
      <Grid container spacing={0.3}>
        {
          data ? data.map((task, id) =>
            <Grid item xs={3} key={id}>
              <TaskWidget task={task} key={id} />
            </Grid>
          ) : null}
      </Grid>
    </div>
  )
}
export default TaskList;
