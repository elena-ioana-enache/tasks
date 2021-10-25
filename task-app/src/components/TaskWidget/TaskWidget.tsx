import { Task } from "../../interfaces/Tasks";

interface Props {
  task: Task;
}
const TaskWidget = ({ task }: Props) => {
  const { name, description, date, status } = task;
  return (
    <div>
      <span>{name}</span>
      <span>{description}</span>
      <span>{date}</span>
      <span>{status}</span>
    </div>)
}
export default TaskWidget;