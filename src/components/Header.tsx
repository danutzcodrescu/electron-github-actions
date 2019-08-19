import * as React from 'react';
import { createStyles, Paper, Theme, Typography, WithStyles, withStyles } from '@material-ui/core';

const styles = ({ palette, spacing }: Theme) =>
  createStyles({
    text: {
      padding: '10px',
    },
    logo: {
      height: '35px',
      marginTop: '18px',
    },
  });

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IProps extends WithStyles<typeof styles> {}

export const Header = withStyles(styles)((props: IProps) => {
  const { classes } = props;
  return (
    <Paper square elevation={0}>
      <Typography className={classes.text} variant="h6">
        On-the-Go
      </Typography>
    </Paper>
  );
});
