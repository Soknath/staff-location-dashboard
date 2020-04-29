import React, {useEffect, useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles, createMuiTheme,MuiThemeProvider } from '@material-ui/core/styles';
import {COMPANY_DEPARTMENT} from '../constants';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    width: 500
  }
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ff9100',
    },
  }
});


export default function SearchAppBar() {
  const classes = useStyles();
  return (
    <MuiThemeProvider theme={theme}>
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <img src="/dashboard/Logo4.png" height="50" alt={"logo"} />
        </Toolbar>
      </AppBar>
    </div>
    </MuiThemeProvider>
  );
}