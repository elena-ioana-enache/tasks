import axios from 'axios';
import { useEffect, useState } from 'react';
import { Task } from '../../interfaces/Tasks';
import TaskWidget from '../TaskWidget/TaskWidget';
import styles from './TaskList.module.scss';

const baseURL = "http://localhost:4000/tasks";

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    axios.get(baseURL).then((response) => {
      const { data } = response;
      setTasks(data as Task[]);
    })
  }, []);
  return (
    <div className={styles.container}>
      <div>Tasks List</div>
      {
        tasks.map(task =>
          <TaskWidget task={task} />
        )}
    </div>
  )
}
export default TaskList;
