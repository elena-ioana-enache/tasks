import { useGetTasksListQuery } from '../../state/services/tasks';
import TaskWidget from '../TaskWidget/TaskWidget';
import styles from './TaskList.module.scss';

const TaskList = () => {
  const { data } = useGetTasksListQuery();

  return (
    <div className={styles.container}>
      <div>Tasks List</div>
      {
        data ? data.map(task =>
          <TaskWidget task={task} key={task.id} />
        ) : null}
    </div>
  )
}
export default TaskList;
