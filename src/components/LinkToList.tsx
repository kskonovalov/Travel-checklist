import React, { useState } from 'react';
import { InputAdornment, TextField } from '@material-ui/core';
import { Link as LinkIcon } from '@material-ui/icons';

const LinkToList = () => {
  const [helperText, setHelperText] = useState<string>(
    'Нажмите, чтобы скопировать'
  );
  return (
    <TextField
      id="standard-basic"
      label="Ссылка на Ваш личный чеклист путешественника"
      fullWidth={true}
      value={`${window.location.href}`}
      helperText={helperText}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <LinkIcon />
          </InputAdornment>
        )
      }}
      onClick={(e: any) => {
        e.target.select();
        document.execCommand('copy');
        setHelperText('Скопировано в буфер обмена!');
      }}
    />
  );
};

export default LinkToList;
