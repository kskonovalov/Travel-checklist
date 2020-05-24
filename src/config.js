import { indigo } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: indigo[700],
    secondary: indigo[700]
  }
});

export { theme };
