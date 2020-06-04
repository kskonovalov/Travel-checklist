import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

interface IProps {
  open: boolean;
  onClose: () => void;
}

const ConfirmDialog = ({ onClose, open }: IProps) => {
  const history = useHistory();
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Вы уверены?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Это действие создаст новый список дел, старый список останется
          доступен по ссылке:
        </DialogContentText>
        <TextField fullWidth={true} value={`${window.location.href}`} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Отменить
        </Button>
        <Button
          onClick={() => {
            history.push(`/`);
          }}
          color="primary"
          variant="outlined"
        >
          Создать новый
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
