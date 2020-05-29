import React from 'react';
import { InputAdornment, TextField } from '@material-ui/core';
import { Link as LinkIcon } from '@material-ui/icons';

const LinkToList = () => {
  return (
    <TextField
      id="standard-basic"
      label="Ссылка на Ваш личный чеклист путешественника"
      fullWidth={true}
      value={`${window.location.href}`}
      helperText="Нажмите, чтобы скопировать"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <LinkIcon />
          </InputAdornment>
        )
      }}
    />
  );
};

export default LinkToList;
