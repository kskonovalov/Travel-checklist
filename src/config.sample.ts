import { indigo } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: indigo
  }
});

export { theme };

const apiUrl: string = 'https://flynow.ru/checklist/';
export { apiUrl };

const saveErrorMessage: string = 'Error while saving on server!';
export { saveErrorMessage };
