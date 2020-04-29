import React, {useEffect, useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { fade, makeStyles, createMuiTheme,MuiThemeProvider } from '@material-ui/core/styles';
import {useIDContext} from '../DataContext';
import {COMPANY_DEPARTMENT} from '../constants';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
  const {getSelectedHeatMap} = useIDContext();
  const [heatMap, setHeatMap] = useState(false);
  
  const handleChange = (event) => {
    setHeatMap(event.target.checked);
    getSelectedHeatMap(event.target.checked);
  };

  const classes = useStyles();
  return (
    <MuiThemeProvider theme={theme}>
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography className={classes.title}>
          <img src="/dashboard/Logo4.png" height="50" alt={"logo"} />
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={heatMap}
                onChange={handleChange}
                name="heatMap"
                color="secondary"
              />
            }
            label="Heat Map"
          />
        </Toolbar>
      </AppBar>
    </div>
    </MuiThemeProvider>
  );
}