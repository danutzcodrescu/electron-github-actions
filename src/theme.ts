import indigo from '@material-ui/core/colors/indigo';
import lightGreen from '@material-ui/core/colors/lightGreen';
import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: lightGreen,
    secondary: indigo,
    background: {
      default: '#F6F7F8',
      paper: '#F6F7F8',
    },
    text: {
      primary: '#2e3236',
      secondary: '#44494d',
    },
  },
  typography: {
    fontFamily: ['Open Sans', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'].join(','),
    allVariants: {
      color: '#2e3236',
    },
  },
});
