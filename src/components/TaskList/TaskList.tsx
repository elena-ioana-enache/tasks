import { Grid, Typography } from '@mui/material';
import { useTasks } from '../../state/services/task.selector';
import CreateTask from '../CreateTask/CreateTask';
import TaskWidget from '../TaskWidget/TaskWidget';
import styles from './TaskList.module.scss';

const TaskList = () => {
  const tasksObj = useTasks();
  const idsList = tasksObj && Object.keys(tasksObj);
  const tasksList = tasksObj && Object.values(tasksObj);
  return (
    <div className={styles.container}>
      <Typography variant='h4'>Tasks List</Typography>
      <CreateTask />
      <Grid container spacing={0.3} className={styles.grid}>
        {
          tasksObj ?
            idsList.map((id, index) =>
              <Grid item xs='auto' key={id}>
                <TaskWidget task={tasksList[index]} key={id} id={id} />
              </Grid>)
            : null}
      </Grid>
    </div>
  )
}
export default TaskList;
