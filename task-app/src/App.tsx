import styles from './App.module.scss';
import TaskList from './components/TaskList/TaskList';

function App() {
  return (
    <div className={styles.container}>
      <TaskList/>
    </div>
  );
}

export default App;
