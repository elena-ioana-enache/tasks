import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAppDispatch } from '../../hooks/redux.hook';
import { useCreateTaskMutation } from '../../state/services/tasks';
import { setFetch } from "../../state/services/task.reducer";
import TaskWidget from '../TaskWidget/TaskWidget';
import { useNewTask } from '../../state/services/task.selector';

const CreateTask = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const newTask = useNewTask();
  const [createTask] = useCreateTaskMutation();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCreate = async () => {
    if (newTask) {
      await createTask({ task: newTask });
      dispatch(setFetch(true));
      handleClose();
    }
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>Add</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Create task?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TaskWidget />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleCreate} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default CreateTask;
