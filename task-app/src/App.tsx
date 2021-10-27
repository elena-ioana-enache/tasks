import styles from './App.module.scss';
import TaskList from './components/TaskList/TaskList';
import { useGetTasksListQuery } from './state/services/tasks';

function App() {

  const { error,isLoading: isTaksListLoading } = useGetTasksListQuery();
  return (
    <div className={styles.container}>
      <div>
        {error ? (
          <>Oh no, there was an error</>
        ) : isTaksListLoading ? (
          <>Loading...</>
        ) : null}
      </div>
      <TaskList />
    </div>
  );
}

export default App;
