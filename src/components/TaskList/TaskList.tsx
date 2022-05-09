import { Grid, Typography } from '@mui/material';
import { useTasks } from '../../state/services/task.selector';
import TaskWidget from '../TaskWidget/TaskWidget';
import styles from './TaskList.module.scss';

const TaskList = () => {
  const data = useTasks();
  const keysArray = data && Object.keys(data);
  const valuesArray = data && Object.values(data);

  return (
    <div className={styles.container}>
      <Typography variant='h4'>Tasks List</Typography>
      <Grid container spacing={0.3}>
        {
          data ? keysArray.map((key, index) =>
            <Grid item xs={3} key={key}>
              <TaskWidget task={valuesArray[index]} key={key} id={key} />
            </Grid>
          ) : null}
      </Grid>
    </div>
  )
}
export default TaskList;
