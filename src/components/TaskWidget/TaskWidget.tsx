import { Task, TaskStatus } from "../../interfaces/Tasks";
import { FormControl, InputLabel, MenuItem, TextField } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { Box } from "@mui/system";
import { useUpdateTaskMutation } from "../../state/services/tasks";
import { useEffect, useState } from "react";
import styles from './TaskWidget.module.scss';

import DeleteWidget from "../DeleteWidget/DeleteWidget";

interface Props {
  task: Task;
  id: string;
}

const TaskWidget = ({ task, id }: Props) => {
  const [updateTask] = useUpdateTaskMutation();
  const [taskDetail, setTaskDetail] = useState<Task>(task);

  useEffect(() => {
    setTaskDetail(task);
  }, [task]);

  const onChangeName = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const taskTemp = { ...taskDetail, name: e.target.value || '' };
    onUpdate(taskTemp);
  }

  const onChangeDescription = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const taskTemp = { ...taskDetail, description: e.target.value };
    onUpdate(taskTemp);
  }

  const onChangeDate = async (date: string | null, keyboardInputValue?: string | undefined) => {
    // @ts-ignore:next-line
    if (date instanceof Date && isFinite(date)) {
      const taskTemp = { ...taskDetail, date: date };
      onUpdate(taskTemp);
    }
  }

  const onChangeStatus = async (event: SelectChangeEvent<TaskStatus>) => {
    const taskTemp = { ...taskDetail, status: event.target.value as TaskStatus };
    onUpdate(taskTemp);
  }

  const onUpdate = async (task: Task) => {
    setTaskDetail(task);
    await updateTask({ task: task, id: id });
  }



  return (
    <div className={styles.container}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          m: 1,
          p: 2,
          border: 1,
          borderColor: '#F0F0F0',
          borderRadius: 2,
          position: 'relative'
        }}>
        <DeleteWidget task={taskDetail} />
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Name"
            variant="outlined"
            value={taskDetail.name}
            fullWidth
            onChange={onChangeName}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Description"
            multiline
            rows={3}
            variant="outlined"
            value={taskDetail.description}
            fullWidth
            onChange={onChangeDescription}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date"
              value={taskDetail.date}
              inputFormat="yyyy-MM-dd"
              onChange={onChangeDate}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
        <Box sx={{ mb: 2 }}>
          <FormControl sx={{ minWidth: '100%' }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={taskDetail.status}
              label="Status"
              fullWidth
              onChange={onChangeStatus}
            >
              <MenuItem value='toDo'>To Do</MenuItem>
              <MenuItem value='doing'>Doing</MenuItem>
              <MenuItem value='done'>Done</MenuItem>
            </Select>
          </FormControl>
        </Box>

      </Box>    </div>
  )
}
export default TaskWidget;
