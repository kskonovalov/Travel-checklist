import React, { useState, useRef } from 'react';
import { InputAdornment, TextField } from '@material-ui/core';
import { Link as LinkIcon } from '@material-ui/icons';

const LinkToList = () => {
  const [helperText, setHelperText] = useState<string>(
    'Нажмите на скрепку, чтобы скопировать ссылку на Ваш лист'
  );

  const textInputRef = useRef<HTMLInputElement>(null);
  return (
    <TextField
      id="standard-basic"
      label="Ссылка на Ваш личный чеклист путешественника"
      fullWidth={true}
      value={`${window.location.href}`}
      helperText={helperText}
      inputRef={textInputRef}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <LinkIcon
              style={{ cursor: 'pointer' }}
              onClick={() => {
                if (textInputRef !== null && textInputRef.current !== null) {
                  textInputRef.current.select();
                  document.execCommand('copy');
                  setHelperText('Скопировано в буфер обмена!');
                }
              }}
            />
          </InputAdornment>
        )
      }}
    />
  );
};

export default LinkToList;
