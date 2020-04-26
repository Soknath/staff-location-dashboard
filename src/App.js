import React from 'react';
import Map from './Dashboard/Map';
import Table from './Dashboard/Table';
import SearchBar from './Dashboard/SearchBar';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {AppContext} from './DataContext';
import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function App() {
  const classes = useStyles();
  const [data, setData] = React.useState(null);

  const getData = (data) => {
    setData(data)
  }
  return (
    <AppContext.Provider value={{data, getData}} >
      <div className={classes.root}>
        <Grid container spacing={1}>
          <SearchBar />
          <Grid item xs={12}>
            <Map />
          </Grid>
          <Grid item xs={12}>
            <Table />
          </Grid>
        </Grid>
      </div>
    </AppContext.Provider>
  );
}

export default App;
