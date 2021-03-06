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

interface IProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDialog = ({ open, onClose, onConfirm }: IProps) => {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Вы уверены?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Это действие создаст новый список дел, старый список останется
          доступен по ссылке:
        </DialogContentText>
        <TextField fullWidth={true} value={`${window.location.href}`} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Отменить
        </Button>
        <Button onClick={onConfirm} color="primary" variant="outlined">
          Создать новый
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
