import { Task, TaskStatus } from "../../interfaces/Tasks";
import { FormControl, IconButton, InputLabel, MenuItem, TextField } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { DatePicker, LoadingButton, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { Box } from "@mui/system";
import { useUpdateTaskMutation, useDeleteTaskMutation } from "../../state/services/tasks";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import styles from './TaskWidget.module.scss';
import { useAppDispatch } from "../../hooks/redux.hook";
import { setFetch } from "../../state/services/task.reducer";

interface Props {
  task: Task;
}

const TaskWidget = ({ task }: Props) => {
  const dispatch = useAppDispatch();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [taskDetail, setTaskDetail] = useState<Task>(task);
  useEffect(() => {
    setTaskDetail(task);
  }, [task]);

  const handleChange = (event: SelectChangeEvent<TaskStatus>) => {
    setTaskDetail({ ...taskDetail, status: event.target.value as TaskStatus })
  }
  const onUpdate = async () => {
    await updateTask({ task: taskDetail });

    dispatch(setFetch(true));
  }
  const onDelete = async () => {
    await deleteTask({ id: taskDetail.id });
    dispatch(setFetch(true));
  }
  return (
    <div className={styles.container}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        m: 1,
        p: 2,
        border: 1,
        borderColor: '#F0F0F0',
        borderRadius: 2,
      }}>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Name"
            variant="outlined"
            value={taskDetail.name}
            fullWidth
            onChange={(e) => setTaskDetail({ ...taskDetail, name: e.target.value })}
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
            onChange={(e) => setTaskDetail({ ...taskDetail, description: e.target.value })}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date"
              value={taskDetail.date}
              inputFormat="yyyy-MM-dd"
              onChange={(newValue) => {
                newValue && setTaskDetail({ ...taskDetail, date: newValue });
              }}
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
              onChange={handleChange}
            >
              <MenuItem value='toDo'>To Do</MenuItem>
              <MenuItem value='doing'>Doing</MenuItem>
              <MenuItem value='done'>Done</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <LoadingButton
            variant="contained"
            onClick={onUpdate}
            loading={isUpdating}
          >Update
          </LoadingButton>
        </Box>
      </Box>

      <IconButton aria-label="close" onClick={onDelete} className={styles.delete}>
        <CloseIcon sx={{ "&:hover": { color: "blue" } }} />
      </IconButton>
    </div>
  )
}
export default TaskWidget;