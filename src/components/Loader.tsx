import React from 'react';
import styled, { keyframes } from 'styled-components';
import Typography from '@material-ui/core/Typography';

const loadingAnimation = keyframes`
  0% {
      top: 8px;
      height: 64px;
    }
    50%,
    100% {
      top: 24px;
      height: 32px;
    }
`;

const StyledLoader = styled.div`
  display: block;
  margin: 10px auto;
  position: relative;
  width: 80px;
  height: 80px;
  & div {
    display: inline-block;
    position: absolute;
    left: 8px;
    width: 16px;
    background: #729389;
    animation: ${loadingAnimation} 1s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  }
  & div:nth-child(1) {
    left: 8px;
    animation-delay: -0.24s;
  }
  & div:nth-child(2) {
    left: 32px;
    animation-delay: -0.12s;
  }
  & div:nth-child(3) {
    left: 56px;
    animation-delay: 0s;
  }
`;

interface ILoader {
  loadingMessage?: string;
}

const Loader: React.FC<ILoader> = ({ loadingMessage }) => {
  return (
    <>
      {typeof loadingMessage !== 'undefined' && loadingMessage.length > 0 ? (
        <Typography align="center" variant="h6">
          {loadingMessage}
        </Typography>
      ) : null}
      <StyledLoader>
        <div />
        <div />
        <div />
      </StyledLoader>
    </>
  );
};

export default Loader;
