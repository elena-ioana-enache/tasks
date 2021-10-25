import { Task } from "../../interfaces/Tasks";
import { Button, FormControl, InputLabel, MenuItem, TextField } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { Box } from "@mui/system";
import { useState } from "react";

interface Props {
  task: Task;
}
const TaskWidget = ({ task }: Props) => {
  const { name, description, status } = task;
  const [date, setDate] = useState<string | null>(task.date);
  const handleChange = (event: SelectChangeEvent<"done" | "toDo" | "doing">) => {
    console.log(event);
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
      <Box sx={{ mb: 2 }}>
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
      </Box>
      <Box sx={{ mb: 2 }}>
        <FormControl sx={{ minWidth: '100%' }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
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
      <Box sx={{ mb: 2 }}>
        <Button variant="outlined">Update</Button>
        <Button variant="contained">Delete</Button>
      </Box>
    </Box>)
}
export default TaskWidget;