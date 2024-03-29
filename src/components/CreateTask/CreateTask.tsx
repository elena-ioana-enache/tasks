
import { useAppDispatch } from '../../hooks/redux.hook';
import { useCreateTaskMutation } from '../../state/services/tasks';
import { setFetch } from "../../state/services/task.reducer";
import TaskWidget from '../TaskWidget/TaskWidget';
import { useNewTask } from '../../state/services/task.selector';
import { TaskStatus } from '../../interfaces/Tasks';

import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),

  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const CreateTask = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const newTask = useNewTask();
  const [createTask] = useCreateTaskMutation();
  const emptyTask = React.useMemo(() => {
    return {
      name: '',
      description: '',
      date: (new Date()).toDateString(),
      status: "toDo" as TaskStatus,
    };
  }, []);
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
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Create new task
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <TaskWidget task={emptyTask} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreate} autoFocus disabled={!newTask?.name}>
            Add
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

export default CreateTask;
