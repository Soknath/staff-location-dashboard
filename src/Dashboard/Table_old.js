import React from 'react';
import MaterialTable, { MTableToolbar } from 'material-table';
import { Card, TextField, Avatar, Chip, Grid } from "@material-ui/core";
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import {useDataContext} from '../DataContext';

import {API_URL} from '../constants';
export default function Table (props) {
  const [selectedStartDate, setSelectedStartDate] = React.useState(new moment().add(-1, 'months'));
  const [selectedEndDate, setSelectedEndDate] = React.useState(new moment());

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };
  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };
    const {getData} = useDataContext();
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <MaterialTable
            title="Please specific date range"
            columns={[
            {
                field: 'url',
                title: 'Avatar',
                render: rowData => <Avatar alt="selfie" src={API_URL + rowData.avatar.formats.small.url} style={{width: 30, height: 30}}/>
            },
            { title: 'Company', field: 'company' },
            { title: 'Department', field: 'department' },
            { title: 'Emp. ID', field: 'empID' },
            { title: 'First name', field: 'firstName' },
            { title: 'Last name', field: 'lastName' },
            { title: 'gender', field: 'gender',
              render: rowData => <Chip label={rowData.gender} />
            },
            { title: 'Email', field: 'email' },
            { title: 'Checkin At', field: 'createdAt', 
              render: rowData => new Date(rowData.createdAt).toLocaleString()},
            ]}
            components={{
              Toolbar: props => (
                  <div style={{ backgroundColor: '#e8eaf5' }}>
                      <MTableToolbar {...props} />
                      <Grid container spacing={3} style={{marginLeft: 15}}justify={"flex-start"}>
                      <Grid item >
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
                        size="small"
                      /></Grid>
                      <Grid item >
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
                        size="small"
                      /></Grid></Grid>
                      <br />
                  </div>
              )
            }}
            options={{
                search: true,
                exportButton: true,
                paging: true,
                pageSize: 20,
                pageSizeOptions: [5,10,20,50],
                rowStyle: {
                  height: '30px !important',
                  padding:  0,
                }
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
            data={query =>
            new Promise((resolve, reject) => {
                let url = API_URL + '/staff-locations?'
                url += '_limit=' + query.pageSize
                url += '&_start=' + (query.page)* query.pageSize
                url += query.search?'&empID=' + query.search:""
                fetch(url).then(response => {
                    console.log(query);
                    var length = response.headers.get('Content-Range');
                    console.log(response.headers.get('Content-Range'))
                    response.json().then(result => {
                    getData(result)
                    resolve({
                        data: result,
                        page: query.page,
                        totalCount: length,
                    })
                    });
                })
            })
            }
        /></MuiPickersUtilsProvider>
    )
}