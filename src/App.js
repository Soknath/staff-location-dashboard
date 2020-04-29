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
  const [selectedID, setSelectedID] = React.useState(null);

  const getData = (data) => {
    setData(data)
  }
  const getSelectedID = (data) => {
    setSelectedID(data)
  }


  return (
    <AppContext.Provider value={{data, selectedID, getData, getSelectedID}} >
      <div className={classes.root}>
        <SearchBar />
        <Grid container>
          <Grid item xs={12} xl={6} lg={4}>
            <Map />
          </Grid>
          <Grid item xs={12} xl={6} lg={8}>
            <div style={{height: '100%', overflowY: "scroll", overflowX: "scroll"}}>
              <Table />
            </div>
          </Grid>
        </Grid>
      </div>
    </AppContext.Provider>
  );
}

export default App;
