import { Task, TaskStatus } from "../../interfaces/Tasks";
import { FormControl, Grid, InputLabel, MenuItem, TextField } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { DatePicker, LoadingButton, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { Box } from "@mui/system";
import { useState } from "react";
import { useUpdateTaskMutation, useDeleteTaskMutation } from "../../state/services/tasks";

interface Props {
  task: Task;
}
const TaskWidget = ({ task }: Props) => {
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [taskDetail, setTaskDetail] = useState<Task>(task);

  const handleChange = (event: SelectChangeEvent<TaskStatus>) => {
    setTaskDetail({ ...taskDetail, status: event.target.value as TaskStatus })
  }
  const onUpdate = async () => {
    await updateTask({ task: taskDetail });
  }
  const onDelete = async () => {
    await deleteTask({ id: taskDetail.id })
  }
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      m: 3,
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
      <Grid container spacing={0.3}>
        <Grid item xs={6}>
          <LoadingButton variant="outlined" onClick={onUpdate} loading={isUpdating}>Update</LoadingButton>
        </Grid>
        <Grid item xs={6}>
          <LoadingButton variant="contained" onClick={onDelete}>Delete</LoadingButton>
        </Grid>
      </Grid>
    </Box>)
}
export default TaskWidget;