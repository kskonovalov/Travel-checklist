import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/styles';
import styled from 'styled-components';

import { theme } from '../config';

const Menu = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;
const MenuItem = styled.li`
  list-style-type: none;
  & a {
    color: #fff;
    text-decoration: none;
    display: block;
    padding: 3px 10px;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const NavBar: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" component="div">
            React + TS
          </Typography>
          <Menu>
            <MenuItem>
              <a href="/">Tasks list</a>
            </MenuItem>
            <MenuItem>
              <a href="/about">About</a>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default NavBar;
