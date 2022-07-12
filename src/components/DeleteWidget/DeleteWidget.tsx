import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch } from '../../hooks/redux.hook';
import { useDeleteTaskMutation } from '../../state/services/tasks';
import { setFetch } from "../../state/services/task.reducer";
import styles from './DeleteWidget.module.scss';
import { Task } from '../../interfaces/Tasks';
interface Props {
  task: Task;
}
const DeleteWidget = ({ task }: Props) => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const [deleteTask] = useDeleteTaskMutation();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = async () => {
    onDelete();
    handleClose();
  }
  const onDelete = async () => {
    await deleteTask({ id: task.id });
    dispatch(setFetch(true));
  }
  return (
    <div>
      <div className={styles.delete}>
        <IconButton aria-label="close" onClick={handleClickOpen}>
          <CloseIcon sx={{ "&:hover": { color: "blue" } }} />
        </IconButton>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete task?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Do you want to delete task "${task.name}"`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default DeleteWidget;
