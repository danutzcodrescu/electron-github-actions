import * as React from 'react';
import {
  Button,
  createStyles,
  FormControlLabel,
  Switch,
  Theme,
  Typography,
  WithStyles,
  withStyles,
  Grid,
} from '@material-ui/core';
// eslint-disable-next-line import/no-extraneous-dependencies
import { shell, ipcRenderer } from 'electron';
import { Header } from './Header';

// Theme-dependent styles
const styles = (theme: Theme) =>
  createStyles({
    text: {
      padding: '10px',
    },
    center: {
      margin: 'auto',
    },
  });

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IProps extends WithStyles<typeof styles> {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  persistAnalytics: (event: React.FormEvent<HTMLFormElement>) => void;
  analytics: boolean;
}

export const Welcome = withStyles(styles)((props: IProps) => {
  const { classes, persistAnalytics, handleChange, analytics } = props;
  React.useEffect(()=>{
    ipcRenderer.on('shortcut key search', (e, args)=>{
      console.log(args);
    })
  })
  return (
    <>
      <Header />
      <Typography className={classes.text} variant="h4">
        Hello there
      </Typography>

      <Typography className={classes.text} variant="body1">
        Welcome to Electron, your desktop companion app to whatever.
      </Typography>

      <form noValidate autoComplete="off" onSubmit={persistAnalytics}>
        <Typography className={classes.text} variant="body1">
          We use app analytics data to improve performance & usability. For more information please see our{' '}
          {/* eslint-disable-next-line */}
          <a onClick={() => shell.openExternal('https://www.google.com/')}>Privacy policy.</a>
        </Typography>
        <Grid container alignItems="center">
          <Grid item xs={4}>
            <FormControlLabel
              className={classes.text}
              control={<Switch checked={analytics} onChange={handleChange} value="analytics" color="primary" />}
              label={analytics ? 'I accept' : 'I do not accept'}
            />
          </Grid>
          <Grid item xs={4}>
            <Button className={classes.center} variant="outlined" type="submit" size="large">
              Let's start
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
});
