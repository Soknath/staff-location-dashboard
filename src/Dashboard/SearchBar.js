import React, {useEffect, useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles, createMuiTheme,MuiThemeProvider } from '@material-ui/core/styles';
import {COMPANY_DEPARTMENT} from '../constants';
import {Grid, FormControl, InputLabel, MenuItem, Select 
} from '@material-ui/core';

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
  },
  whiteColor: {
    color: "white !important"
  },
  button: {
    margin: theme.spacing(1),
  },
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
  const [company, setCompany] = React.useState("AH");
  const [department, setDepartment] = React.useState("");
  const [companies, setCompanies] = React.useState(null);
  const [departments, setDepartments] = React.useState(null);
  
  useEffect(() => {
    async function fetchCompany() {
      try {
          let companyDepartments = await fetch(COMPANY_DEPARTMENT).then(res => res.json());
          let companiesData = [];
          let departmentsData = {};
          await companyDepartments.map((record, index) => {
              if (!companiesData.includes(record.companyName)) {
                companiesData.push(record.companyName)
              }
              if (!Object.keys(departmentsData).includes(record.companyName)) {
                  console.log(record.companyName)
                  departmentsData[record.companyName] = [record.department]
              } else {
                  console.log(record.companyName)
                  departmentsData[record.companyName].push(record.department)
                  console.log(departmentsData)
              }
              
          })
          setCompanies(companiesData);
          setDepartments(departmentsData);
      } catch (error) {
          console.log(error)
      }
    }
    if (!companies || !departments){
        console.log()
        fetchCompany();
    }
  },[])

  const handleChangeCompany = company => {
    setCompany(company.target.value);
  };
  const handleChangeDepartment = department => {
    setDepartment(department.target.value);
  };

  if(!departments) return null;
  return (
    <MuiThemeProvider theme={theme}>
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
        <Typography variant="h6" className={classes.title}>
          AAPICO STAFF LOCATION
        </Typography>
        <Grid container justify="flex-end" spacing={2} >
        <Grid item xs={3}>
          <FormControl variant="outlined" fullWidth size="small" >
            <InputLabel id="demo-simple-select-outlined-label" className={classes.whiteColor} >Company</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={company}
              onChange={handleChangeCompany}
              label="Company"
              classes={{
                root: classes.whiteColor,
                icon: classes.whiteColor
              }} 
            >
              {companies.map((comp, index) => (
                <MenuItem value={comp} key={index}>{comp}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl variant="outlined" fullWidth size="small" >
            <InputLabel id="demo-simple-select-outlined-label" className={classes.whiteColor}>Department</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={department}
              onChange={handleChangeDepartment}
              label="Department"
              classes={{
                root: classes.whiteColor,
                icon: classes.whiteColor
              }} 
            >
              {departments[company].map((depart, index) => (
                <MenuItem value={depart} key={index}>{depart}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid> 
        </Grid>
        </Toolbar>
      </AppBar>
    </div>
    </MuiThemeProvider>
  );
}