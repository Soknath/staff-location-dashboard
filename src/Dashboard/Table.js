import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
import {Avatar, Chip, Grid, FormControl, InputLabel, MenuItem, Select, Button, Paper } from "@material-ui/core";
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {COMPANY_DEPARTMENT} from '../constants';
import {useDataContext, useIDContext} from '../DataContext';
import _ from 'lodash';

import {API_URL} from '../constants';

export default function Table (props) {
    
    const [selectedStartDate, setSelectedStartDate] = React.useState(new moment());
    const [selectedEndDate, setSelectedEndDate] = React.useState(new moment());
    const [data, setData] = React.useState(null);
    const [company, setCompany] = React.useState();
    const [department, setDepartment] = React.useState();
    const [companies, setCompanies] = React.useState(null);
    const [departments, setDepartments] = React.useState(null);
    const {getData} = useDataContext();
    const {getSelectedID} = useIDContext();

    useEffect (()=> {
        async function fetchData() {
            try {
                let response = await fetch( API_URL + `/staff-locations?_limit=-1&_sort=createdAt:DESC&createdAt_gte=${new moment().startOf('day').toISOString()}`).then(res=>res.json())    
                console.log(response);
                setData(response);
                getData(response)
            } catch (error) {
                console.log(error)
            }
        }
        if(!data) {
            fetchData();
        }
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
    },[company, department]);

    const searchData = async () => {
      try {
          let response = await fetch( 
            `${API_URL}/staff-locations?_limit=-1&_sort=createdAt:DESC&createdAt_gte=${new moment(selectedStartDate).startOf('day').toISOString()}&createdAt_lte=${new moment(selectedEndDate).endOf('day').toISOString()}&${company && company !== "ALL"?'company='+company:""}&${department && department !== "ALL"?'department='+department.replace("&","%26"):""}`
            )
          .then(res=>res.json())
          console.log(response);
          setData(response)
          getData(response)
      } catch (error) {
          console.log(error)
      }
    }

    const handleStartDateChange = (date) => {
        setSelectedStartDate(date);
    };
    const handleEndDateChange = (date) => {
        setSelectedEndDate(date);
    };
    
    const handleChangeCompany = company => {
        setCompany(company.target.value);
        setDepartment("ALL");
    };
    console.log(department);

    const handleChangeDepartment = department => {
        setDepartment(department.target.value);
    };
    function convertArrayOfObjectsToCSV(array, data) {
      let result;
      let keys = [];
      array.forEach(element => {
        if(element.field !== 'url')
          keys.push(element.field);
      });
    
      const columnDelimiter = ",";
      const lineDelimiter = "\n";
    
      result = "";
      result += keys.join(columnDelimiter);
      result += lineDelimiter;
    
      data.forEach(item => {
        let ctr = 0;
        keys.forEach(key => {
          if (ctr > 0) result += columnDelimiter;
          if (key === "createdAt")
            result += new Date(item[key]).toLocaleString();
          else
            result += item[key]
          ctr++;
        });
        result += lineDelimiter;
      });
      console.log(result);
      return result;
    }
    
    function downloadCSV(array, data) {
      const link = document.createElement("a");
      let csv = convertArrayOfObjectsToCSV(array, data);
      if (csv == null) return;
    
      const filename = `export_from_${new Date(selectedStartDate).toLocaleDateString()}_to_${new Date(selectedEndDate).toLocaleDateString()}.csv`;
    
      if (!csv.match(/^data:text\/csv/i)) {
        csv = `data:text/csv;charset=utf-8,${csv}`;
      }
    
      link.setAttribute("href", encodeURI(csv));
      link.setAttribute("download", filename);
      link.click();
    }

    if (!data || !companies || !departments){
      return null;
    };

    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <div style=
          {{
            height: 'calc(100vh - 48px)',
            overflowY: 'scroll'
          }}>
        <Paper style={{"overflow": "hidden"}}>
          <div style={{ backgroundColor: '#e8eaf5'}}>
          <Grid container spacing={1} justify="center" alignItems="center">
          <Grid item xs={6} md={3} style={{ height: 80}}>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="start date"
            format="YYYY/MM/DD"
            value={selectedStartDate}
            onChange={handleStartDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            inputVariant="outlined"
            size="small"
          /></Grid>
          <Grid item xs={6} md={3} style={{ height: 80}}>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="end date"
            format="YYYY/MM/DD"
            value={selectedEndDate}
            onChange={handleEndDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            inputVariant="outlined"
            size="small"
          />
          </Grid>
        <Grid item xs={12} md={2}>
        <div>
        <FormControl variant="outlined" fullWidth style={{maxWidth: 266}} size="small" >
            <InputLabel id="demo-simple-select-outlined-label" >Company</InputLabel>
            <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={company?company:"ALL"}
                onChange={handleChangeCompany}
                label="Company"
            >
            <MenuItem value={"ALL"} key={"first"}>{"ALL"}</MenuItem>
            {companies.map((comp, index) => (
                <MenuItem value={comp} key={index}>{comp}</MenuItem>
            ))}
            </Select>
        </FormControl>
        </div>
        </Grid>
        <Grid item xs={12} md={2}>
        <FormControl variant="outlined" fullWidth style={{maxWidth: 266}} size="small" >
            <InputLabel>Department</InputLabel>
            <Select
              id="demo-simple-select-outlined"
              value={department?department:"ALL"}
              onChange={handleChangeDepartment}
              label="Department"
            >
            <MenuItem value={"ALL"} key={"first"}>{"ALL"}</MenuItem>
            {company?departments[company].map((depart, index) => (
                <MenuItem value={depart} key={index}>{depart}</MenuItem>
            )):null}
            </Select>
        </FormControl>
        </Grid> 
        <Button 
          variant="contained"
          color="primary"
          size="large"
          onClick={() => searchData()}
          size={"small"}
        >SEARCH</Button>
        </Grid>
      </div>
        <MaterialTable 
            onRowClick={(event, rowData) => {
              console.log(rowData);
              getSelectedID(rowData);
            }}
            title={`${_.uniqBy(data, "empID").length} persons`}
            columns={[
            { title: 'Company', field: 'company'},
            { title: 'Department', field: 'department', width: 50},
            {
                field: 'url',
                title: 'Avatar',
                export: false,
                headerStyle: {maxWidth: 60},
                cellStyle:{ padding: '0px'},
                grouping: false,
                render: rowData => <Avatar alt="selfie" src={API_URL + rowData.avatar.url} style={{width: 30, height: 30}}/>
            },
            { title: 'E. ID', field: 'empID'},
            { title: 'F. name', field: 'firstName',  headerStyle: {maxWidth: 60},
            grouping: false },
            { title: 'L. name', field: 'lastName', headerStyle: {maxWidth: 40},
            grouping: false },
            { title: 'Health', field: 'healthStatus', headerStyle: {maxWidth: 60},
            grouping: false },
            { title: 'Gender', field: 'gender', hidden: true, export: true, grouping: false },
            { title: 'Email', field: 'email', hidden: true, export: true, grouping: false },
            { title: 'Address', field: 'address', hidden: true, export: true, grouping: false },
            { title: 'At', field: 'createdAt', grouping: false,  headerStyle: {minWidth: 120}, width: 120,
              render: rowData => new Date(rowData.createdAt).toLocaleString()}
            ]}
            detailPanel={rowData => {
              return (
                <Grid container spacing={2} style={{margin: 10}}>
                  <Grid item>
                  <Avatar alt="selfie" src={API_URL + rowData.avatar.url} style={{width: 150, height: 150}}/>
                  </Grid>
                  <Grid item>
                  <Chip label={rowData.gender} />  
                  </Grid>
                  <Grid item>
                  <Chip label={rowData.email} />
                  </Grid>
                  <Grid item>
                  <Chip label={rowData.address} />
                  </Grid>
                </Grid>
              )
            }}
            options={{
                search: true,
                exportButton: true,
                paging: true,
                pageSize: 20,
                grouping: true,
                exportAllData: true,
                exportCsv: (columns, data) => {
                  downloadCSV(columns, data);
                },
                pageSizeOptions: [5,10,20,50,100,500],
                cellStyle: {height: 30, paddingTop:0, paddingBottom:0}
            }}
            // actions={[
            //     {
            //       icon: 'map',
            //       tooltip: 'Save User',
            //       onClick: (event, rowData) => {
            //         // Do save operation
            //         alert(JSON.stringify(rowData))
            //         this.props.callMap(rowData);
            //       }
            //     }
            // ]}
            data={data}
        />
    </Paper></div></MuiPickersUtilsProvider>
    )
}