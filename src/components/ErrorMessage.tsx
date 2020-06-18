import React from 'react';
import styled from 'styled-components';

const Message = styled.div`
  text-align: center;
  color: #932727;
  font-size: 12px;
  margin-top: 10px;
`;

const ErrorMessage: React.FC<{ text: string }> = ({ text }) => {
  return <Message>{text}</Message>;
};

export default ErrorMessage;
