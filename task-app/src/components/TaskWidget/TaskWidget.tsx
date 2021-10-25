import { Task } from "../../interfaces/Tasks";
import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { Box } from "@mui/system";
import { useState } from "react";
import styles from './TaskWidget.module.scss';

interface Props {
  task: Task;
}
const TaskWidget = ({ task }: Props) => {
  const { name, description, status } = task;
  const [date, setDate] = useState<string | null>(task.date);
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      m: 3,
      p:2,
      border: 1,
      borderColor: '#F0F0F0',
      borderRadius: 2,
    }}>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          fullWidth
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Description"
          multiline
          rows={3}
          variant="outlined"
          value={description}
          fullWidth
        />
      </Box>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Date"
          value={date}
          inputFormat="yyyy-MM-dd"
          onChange={(newValue) => {
            setDate(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <Box sx={{ mt: 2 }}>
        <span className={styles.status}>{status}</span>
      </Box>
    </Box>)
}
export default TaskWidget;